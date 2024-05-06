const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const body = req.body;
    console.log('userInfo ', req.userInfo);
    try {
        const product = new Product(body);
        const result = await product.save();
        res.status(201)
            .json({ message: "created", result });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
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
        const updateDoc = { $set: { ...body } };
        updateDoc.updatedAt = Date.now();
        await Product.findByIdAndUpdate(id, updateDoc);
        res.status(200)
            .json({ message: "updated" });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
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
        const result = await Product.findOne({
            $or: [
                { pid: query },
                { productName: query },
                { price: query },
                { store: query },
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