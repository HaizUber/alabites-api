const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
    const { name, description, price, store, category } = req.body;
    try {
        const product = new Product({ name, description, price, store, category });
        const result = await product.save();
        res.status(201).json({ message: "success", data: result });
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ message: "success", data: products });
    } catch (err) {
        console.error("Error getting products:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get a product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "success", data: product });
    } catch (err) {
        console.error("Error getting product by ID:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update a product by ID
const updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, store, category } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, description, price, store, category }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "success", data: updatedProduct });
    } catch (err) {
        console.error("Error updating product by ID:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete a product by ID
const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "success", data: deletedProduct });
    } catch (err) {
        console.error("Error deleting product by ID:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
