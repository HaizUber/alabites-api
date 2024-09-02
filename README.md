# Alabites API

## Overview

The **Alabites API** is the backend service for the Alabites ecommerce platform. It provides endpoints for managing users, orders, products, and stores. The API is built using Node.js and Express, with MongoDB as the database. It supports authentication via Firebase and is hosted on Vercel for easy deployment and scalability.

## Features

- **User Management:** Create, read, update, and delete user profiles.
- **Order Management:** Create, read, update, and delete orders.
- **Product Management:** Create, read, update, and delete products, including image handling.
- **Store Management:** Manage store information and inventory.
- **Authentication:** Secure endpoints with Firebase authentication.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (using Mongoose)
- **Authentication:** Firebase
- **Hosting:** Vercel

## Endpoints

### User Endpoints

- **GET** `/users` - Retrieve all users
- **GET** `/users/:id` - Retrieve a user by ID
- **POST** `/users` - Create a new user
- **PUT** `/users/:id` - Update a user by ID
- **DELETE** `/users/:id` - Delete a user by ID

### Order Endpoints

- **GET** `/orders` - Retrieve all orders
- **GET** `/orders/:id` - Retrieve an order by ID
- **POST** `/orders` - Create a new order
- **PUT** `/orders/:id` - Update an order by ID
- **DELETE** `/orders/:id` - Delete an order by ID

### Product Endpoints

- **GET** `/products` - Retrieve all products
- **GET** `/products/:id` - Retrieve a product by ID
- **POST** `/products` - Create a new product
- **PUT** `/products/:id` - Update a product by ID
- **DELETE** `/products/:id` - Delete a product by ID
- **DELETE** `/products/:id/photo/:photoIndex` - Delete a product photo by index

### Store Endpoints

- **GET** `/stores` - Retrieve all stores
- **GET** `/stores/:id` - Retrieve a store by ID
- **POST** `/stores` - Create a new store
- **PUT** `/stores/:id` - Update a store by ID
- **DELETE** `/stores/:id` - Delete a store by ID

### Admin Endpoints

- **POST** `/admins` - Create a new admin
- **GET** `/admins` - Get all admins
- **GET** `/admins/query/:query` - Get admins by query
- **GET** `/admins/:uid` - Get admin by UID
- **PUT** `/admins/:uid` - Update admin by UID
- **DELETE** `/admins/:uid` - Delete admin by UID
- **POST** `/admins/:uid/add-currency` - Add currency to a user (admin action)
- **PUT** `/admins/:uid/update-about-me` - Update about me section of an admin

### Review Endpoints

- **POST** `/reviews` - Create a new review
- **GET** `/reviews/product/:productId` - Get reviews for a specific product
- **GET** `/reviews/:reviewId` - Get a review by ID
- **PUT** `/reviews/:reviewId` - Update a review by ID
- **DELETE** `/reviews/:reviewId` - Delete a review by ID
- **GET** `/reviews/store/:storeId` - Get reviews for products owned by the store

## License

This project is licensed under the [MIT License](https://mit-license.org/)

## Contact

For any inquiries, please contact [HaizUber](mailto:gabzmejia117@gmail.com).
