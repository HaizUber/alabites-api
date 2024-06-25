const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
    const { store, ...body } = req.body; // Extract store ID and other fields from req.body
    console.log('userInfo ', req.userInfo);

    try {
        // Check if the store ID is provided
        if (!store) {
            return res.status(400).json({ message: "Store ID is required" });
        }

        // Create a new product instance with the provided data
        const product = new Product({
            ...body,
            store // Set the store field explicitly
        });

        // Save the product to the database
        const result = await product.save();

        // Respond with a success message and the created product
        res.status(201).json({ message: "Product created successfully", result });
    } catch (err) {
        // Handle any errors and respond with an error message
        console.error('Error creating product:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all products
const getProducts = async (req, res) => {
    try {
        const results = await Product.find({});
        res.status(200).json({ message: "Success", data: results });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Product.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a product by ID
const updateProductById = async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        // Check if the provided ID is valid
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Find the product by ID
        const product = await Product.findById(id);

        // If the product doesn't exist, return an error
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the product fields with the data from the request body
        product.set({
            ...body,
            updatedAt: Date.now() // Update the updatedAt field
        });

        // Save the updated product to the database
        await product.save();

        // Respond with a success message
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        // Handle any errors and respond with an error message
        console.error('Error updating product:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a product by ID
const deleteById = async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get products by a query (pid, name, price, store, tags)
const getProductByQuery = async (req, res) => {
    const query = req.params.query;

    try {
        const result = await Product.find({
            $or: [
                { pid: query },
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search for product name
                { price: query },
                { store: query },
                { tags: { $in: [query] } } // Search in tags array
            ]
        });

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        console.error('Error fetching product by query:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update product stock by ID
const updateProductStockById = async (req, res) => {
    const id = req.params.id;
    const { stock } = req.body;

    try {
        // Check if the provided ID is valid
        if (!id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Check if stock is provided and is a valid number
        if (stock === undefined || stock === null || typeof stock !== 'number' || stock < 0) {
            return res.status(400).json({ message: "Valid stock value is required" });
        }

        // Find the product by ID
        const product = await Product.findById(id);

        // If the product doesn't exist, return an error
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the stock of the product
        product.stock = stock;

        // Save the updated product to the database
        await product.save();

        // Respond with a success message
        res.status(200).json({ message: "Product stock updated successfully" });
    } catch (err) {
        // Handle any errors and respond with an error message
        console.error('Error updating product stock:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductByQuery,
    updateProductById,
    deleteById,
    updateProductStockById
};
