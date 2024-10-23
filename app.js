import express from "express";
import cors from "cors";
import { createClient } from "redis";

const app = express();

app.use(cors());
app.use(express.json());

const client = createClient({
  password: "2tg9P7jFkW8SGf3eF14IFb77v4GrrGT2",
  socket: {
    host: "redis-10420.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 10420,
  },
});

(async () => {
  try {
    await client.connect();
    console.log("succesfully connected to redis client");
  } catch (error) {
    console.log("error connecting to redis client");
  }
})();

app.post("/", async (req, res) => {
  try {
    const { key, value } = req.body;
    console.log(key, value);
    await client.set(key, value);
    return res.status(200).json("data posted successfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/", async (req, res) => {
  try {
    const keys = await client.keys("*");

    const promises = keys.map(async (key) => {
      const value = await client.get(key);
      console.log({ key, value });
      return { key, value };
    });

    const data = await Promise.all(promises);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/by-key", async (req, res) => {
  try {
    const findKey = await client.exists(req.query.key);
    if (!findKey) {
      return res.status(400).send("key not found");
    }

    const value = await client.get(req.query.key);
    return res.status(200).json({ value });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.put("/", async (req, res) => {
  try {
    const { key, value } = req.body;
    const findKey = await client.exists(key);
    if (findKey) {
      await client.set(key, value);
      return res.status(200).send("data updated successfully");
    }
    return res.status(400).send("key not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.delete("/", async (req, res) => {
  try {
    const findKey = await client.exists(req.query.key);
    if (!findKey) {
      return res.status(400).send("key not found");
    }

    await client.del(req.query.key);
    return res.status(200).json("key deleted succesfully");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log("server listening on http://localhost:" + port);
});
