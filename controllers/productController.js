const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const body = req.body;
    console.log('userInfo ', req.userInfo);
    try {
        // Extract store ID from the request body or any other relevant source
        const storeId = body.store;

        // Check if the store ID is provided
        if (!storeId) {
            return res.status(400).json({ message: "Store ID is required" });
        }

        // Create a new product instance with the provided data
        const product = new Product({
            ...body,
            store: storeId // Set the store field explicitly
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
}


const getProducts = async (req, res) => {
    try {
        const results = await Product.find({});
        res.status(200)
            .json({ message: "success", data: results });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Product.findById(id);
        res.status(200)
            .json({ message: "success", data: result });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

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
        product.name = body.name || product.name;
        product.description = body.description || product.description;
        product.price = body.price || product.price;
        product.productphoto = body.productphoto || product.productphoto;
        product.updatedAt = Date.now();

        // Save the updated product to the database
        await product.save();

        // Respond with a success message
        res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
        // Handle any errors and respond with an error message
        console.error('Error updating product:', err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.status(200)
            .json({ message: "deleted" });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getProductByQuery = async (req, res) => {
    const query = req.params.query;
    try {
        const result = await Product.find({
            $or: [
                { pid: query },
                { productName: query },
                { price: query },
                { store: query },
                { name: query },
                { category: query }
            ]
        });
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductByQuery,
    updateProductById,
    deleteById
}