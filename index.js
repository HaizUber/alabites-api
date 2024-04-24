const express = require('express');
const app = express();
const morgan = require('morgan'); // Import morgan for logging
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
const productRoutes = require('./routes/productRoutes');
const redisClient = require('./redis'); // Adjusted import path
const Product = require('./models/product'); // Import your product model

app.use(express.json());

// Middleware for logging response time
app.use(morgan('dev')); // Use 'dev' format for logging

// Middleware to cache responses for /products endpoints
app.use('/products', async (req, res, next) => {
  try {
    const cacheKey = req.originalUrl || req.url; // Use request URL as cache key
    const cachedData = await getAsync(cacheKey);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      return res.status(200).json(data);
    }
    
    // Define a function to fetch data from MongoDB
    const fetchFromMongoDB = async () => {
      try {
        // Implement your MongoDB query here
        const dataFromMongoDB = await Product.find(); // Example MongoDB query using your product model
        return dataFromMongoDB;
      } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return null;
      }
    };

    // Call fetchFromMongoDB only if cache is empty
    const dbData = await fetchFromMongoDB();
    if (dbData) {
      // Cache the fetched data
      cacheResponse(cacheKey, dbData);
      // Send the response
      return res.status(200).json(dbData);
    } else {
      // If data not found in MongoDB or error occurred, proceed to next middleware or route handler
      next();
    }
  } catch (error) {
    console.error("Error in cache middleware:", error);
    next();
  }
});

// Function to cache data from database response
const cacheResponse = (key, data) => {
  redisClient.setex(key, 600, JSON.stringify(data)); // Cache data for 10 minutes (600 seconds)
};

app.get('/', (req, res) => {
    res.send('products api running new deploy');
});

app.get('/ping', (req, res) => {
    res.send('PONG')
});
// /products
app.use('/products', productRoutes);

app.listen(PORT, () => {
    console.log('Server is listening on PORT :' + PORT);
});

// Function to get data from Redis
const getAsync = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, reply) => {
      if (err) reject(err);
      resolve(reply);
    });
  });
};
