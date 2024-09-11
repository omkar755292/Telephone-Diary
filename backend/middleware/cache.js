// middleware/cache.js
const redisClient = require("../config/redisClient");

const cache = async (req, res, next) => {
    const key = req.user.id;

    try {
        const cachedData = await redisClient.get(key);
        if (cachedData) {
            // If cached data is found, return it
            return res.status(200).json(JSON.parse(cachedData));
        }
        next(); // Proceed if no cached data found
    } catch (error) {
        console.error('Redis cache error:', error);
        next(); // Proceed if there's an error with Redis
    }
};

module.exports = cache;
