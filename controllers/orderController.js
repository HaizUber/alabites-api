const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
    const body = req.body;
    try {
        const order = new Order(body);
        const result = await order.save();
        res.status(201).json({ message: "Order created successfully", result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all orders
const getOrders = async (req, res) => {
    try {
        const results = await Order.find({});
        res.status(200).json({ message: "Success", data: results });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get order by order number
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

const updateOrderByOrderNumber = async (req, res) => {
    try {
        const orderNumber = req.params.orderNumber;
        const body = req.body;

        const order = await Order.findOne({ orderNumber });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update order fields
        Object.keys(body).forEach(key => {
            order[key] = body[key];
        });

        // Specifically handle order status update if it exists in the request body
        if (body.orderStatus) {
            order.orderStatus = body.orderStatus;
        }

        order.updatedAt = Date.now();

        await order.save();
        res.status(200).json({ message: "Order updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete order by order number
const deleteOrderByOrderNumber = async (req, res) => {
    try {
        const orderNumber = req.params.orderNumber;
        const result = await Order.findOneAndDelete({ orderNumber });

        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get orders by query
const getOrderByQuery = async (req, res) => {
    const query = req.params.query;
    try {
        const result = await Order.find({
            $or: [
                { orderNumber: query },
                { 'customer.name': query },
                { 'customer.email': query },
                { status: query }
            ]
        }).populate('items.productId');
        if (!result) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createOrder,
    getOrders,
    getOrderByOrderNumber,
    updateOrderByOrderNumber,
    deleteOrderByOrderNumber,
    getOrderByQuery
}
