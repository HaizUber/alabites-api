const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const cors = require('cors');
const helmet = require('helmet');
const PORT = process.env.PORT || 8080;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const storeRoutes = require('./routes/storeRoutes');

// CORS Configuration
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Security Middleware
app.use(helmet());

// Body Parser Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Alabites API is running!');
});

app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Mount routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/store', storeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid token' });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Default error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
