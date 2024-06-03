const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
    const body = req.body;
    try {
        // Create a new order instance with the provided data
        const order = new Order({
            ...body,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        // Save the order to the database
        const result = await order.save();

        // Respond with a success message and the created order
        res.status(201).json({ message: "Order created successfully", result });
    } catch (err) {
        // Handle any errors and respond with an error message
        console.error('Error creating order:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getOrders = async (req, res) => {
    try {
        const results = await Order.find({});
        res.status(200).json({ message: "Success", data: results });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getOrderByOrderNumber = async (req, res) => {
    try {
        const orderNumber = req.params.orderNumber;
        const result = await Order.findOne({ orderNumber }).populate('items.productId');
        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};


const updateOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        // Check if the provided ID is valid
        if (!id) {
            return res.status(400).json({ message: "Order ID is required" });
        }

        // Find the order by ID
        const order = await Order.findById(id);

        // If the order doesn't exist, return an error
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the order fields with the data from the request body
        order.orderDetails = body.orderDetails || order.orderDetails;
        order.customerName = body.customerName || order.customerName;
        order.customerEmail = body.customerEmail || order.customerEmail;
        order.items = body.items || order.items;
        order.totalAmount = body.totalAmount || order.totalAmount;
        order.orderStatus = body.orderStatus || order.orderStatus;
        order.updatedAt = Date.now();

        // Save the updated order to the database
        await order.save();

        // Respond with a success message
        res.status(200).json({ message: "Order updated successfully" });
    } catch (err) {
        // Handle any errors and respond with an error message
        console.error('Error updating order:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const getOrderByQuery = async (req, res) => {
    const query = req.params.query;
    try {
        const result = await Order.find({
            $or: [
                { orderNumber: query },
                { customerName: query },
                { customerEmail: query },
                { orderStatus: query }
            ]
        }).populate('items.productId');
        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderByOrderNumber,
    updateOrderById,
    deleteOrderById,
    getOrderByQuery
};
