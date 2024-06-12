const User = require('../models/User');

const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = new User(userData);
        const result = await user.save();
        res.status(201).json({ message: "User created", result });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: "Success", data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserById = async (req, res) => {
    const uid = req.params.uid; // Change id to uid
    try {
        const user = await User.findOne({ uid }); // Find user by UID
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Success", data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateUserById = async (req, res) => {
    const uid = req.params.uid; // Change id to uid
    const updateData = req.body;
    try {
        // Construct update document
        const updateDoc = {
            $set: {
                firstName: updateData.firstName,
                lastName: updateData.lastName,
                email: updateData.email,
                username: updateData.username,
                studentavatar: updateData.studentavatar // Correct field name
            },
            updatedAt: Date.now() // Update updatedAt field
        };

        // Find user by UID and update
        const updatedUser = await User.findOneAndUpdate({ uid }, updateDoc, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated", data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteUserById = async (req, res) => {
    const uid = req.params.uid; // Change id to uid
    try {
        const deletedUser = await User.findOneAndDelete({ uid }); // Find user by UID and delete
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUsersByQuery = async (req, res) => {
    const query = req.params.query;
    try {
        const users = await User.find({
            $or: [
                { uid: query },
                { firebaseUID: query },
                { email: query },
                { username: query },
                { studentNumber: query }
            ]
        });
        res.status(200).json({ message: "Success", data: users });
    } catch (error) {
        console.error("Error fetching users by query:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Spend currency from user
const spendCurrencyFromUser = async (req, res) => {
    const { uid, amount, description } = req.body;
    console.log(`Request received to spend currency: uid=${uid}, amount=${amount}, description=${description}`);
    
    try {
        const user = await User.findOne({ uid });
        if (!user) {
            console.log(`User not found for uid=${uid}`);
            return res.status(404).json({ message: "User not found" });
        }

        console.log(`User found: ${user}`);

        // Log the user's current balance before spending
        console.log(`User's current balance: ${user.balance}`);

        await user.spendCurrency(amount, description);

        // Log the user's new balance after spending
        console.log(`User's new balance: ${user.balance}`);

        res.status(200).json({ message: "Currency spent", data: user });
    } catch (error) {
        console.error("Error spending currency:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const addTransactionToUser = async (req, res) => {
    const uid = req.params.uid;
    const { transaction } = req.body;

    console.error("Received request to add transaction:", transaction);
    console.error("User UID:", uid);

    try {
        const user = await User.findOne({ uid });

        if (!user) {
            console.error("User not found for UID:", uid);
            return res.status(404).json({ message: "User not found" });
        }

        console.error("User found:", user);

        // Add the transaction to the user's transaction history
        user.transactionHistory.push(transaction);
        user.updatedAt = Date.now();

        const updatedUser = await user.save();
        console.error("Transaction added, updated user:", updatedUser);

        res.status(200).json({ message: "Transaction added", data: updatedUser });
    } catch (error) {
        console.error("Error adding transaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUsersByQuery,
    updateUserById,
    deleteUserById,
    spendCurrencyFromUser,
    addTransactionToUser  
};




