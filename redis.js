const Redis = require("ioredis");

// Create a Redis client
const redisClient = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

// Log when Redis client is connected
redisClient.on("connect", () => {
  console.log("Redis connected");
});

// Log Redis errors
redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

module.exports = redisClient;
