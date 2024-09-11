// config/redisClient.js
const redis = require('redis');
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Log when connected
redisClient.on('connect', () => {
    console.log('Redis client connected successfully');
});

redisClient.connect(); // if you're using Redis v4 or above

module.exports = redisClient;