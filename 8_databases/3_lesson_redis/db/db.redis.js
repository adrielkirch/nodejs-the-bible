const redis = require("redis");
const { REDIS_HOST,REDIS_PORT } = require("../config");

const redisClient = redis.createClient({
  host: REDIS_HOST || 'localhost',
  port: REDIS_PORT || 6379,
});

redisClient.on("connect", () => console.log("Redis client connected"));
redisClient.on("error", (err) => console.log("Redis Client Error", err));

module.exports = redisClient;
