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
const reviewRoutes = require('./routes/reviewsRoutes');

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Security middleware
app.use(helmet());

// Body parser middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('alabites api running and ready to break ;-;');
});

app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Mount routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/admins', adminRoutes);
app.use('/store', storeRoutes);
app.use('/reviews', reviewRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Invalid token' });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
    console.log('Server is listening on PORT: ' + PORT);
});
