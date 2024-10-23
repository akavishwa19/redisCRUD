# Redis CRUD APP

This is a Node.js-based backend app using Express and Redis to perform basic CRUD (Create, Read, Update, Delete) operations. It supports storing, retrieving, updating, and deleting key-value pairs in Redis. The environment variables are managed through a `.env` file.

## Features

- **Create**: Store key-value pairs in Redis.
- **Read**: Retrieve all stored key-value pairs or fetch specific values by key.
- **Update**: Modify the value of an existing key.
- **Delete**: Remove key-value pairs from Redis.
- **Environment Variables**: Redis credentials and server configurations are stored securely using a `.env` file.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Redis Cloud](https://redis.com/try-free/) account or local Redis installation
- [Redis CLI](https://redis.io/topics/rediscli) (for testing Redis manually if necessary)

## Environment Setup

Create a `.env` file in the root directory of the project and add the following environment variables with your Redis Cloud credentials:

```bash
PORT=3000
REDIS_CLIENT_PASSWORD=your_redis_password
REDIS_CLIENT_HOST=your_redis_host
REDIS_CLIENT_PORT=your_redis_port
