const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./db');
const PORT = process.env.PORT || 8080;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes
const storeRoutes = require('./routes/storeRoutes'); // Import store routes

app.use(express.json());

// Allow requests from localhost and alabites-ordering-app.vercel.app
const allowedOrigins = ['http://localhost:3000', 'https://alabites-ordering-app.vercel.app'];
app.use(cors({
  origin: allowedOrigins
}));

app.get('/', (req, res) => {
    res.send('alabites api running and ready to break ;-;');
});

app.get('/ping', (req, res) => {
    res.send('PONG')
});

// Mount product routes
app.use('/products', productRoutes);

// Mount user routes
app.use('/users', userRoutes); // Use '/users' as the base path for user routes

// Mount admin routes
app.use('/admins', adminRoutes); // Use '/admins' as the base path for admin routes

// Mount store routes
app.use('/store', storeRoutes); // Use '/store' as the base path for store routes

app.listen(PORT, () => {
    console.log('Server is listening on PORT: ' + PORT);
});
