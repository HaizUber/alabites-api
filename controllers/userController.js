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
            $set: { // Update user details
                firstName: updateData.firstName,
                lastName: updateData.lastName,
                email: updateData.email,
                username: updateData.username,
                avatar: updateData.avatar // Add avatar update
            }
        };

        updateDoc.updatedAt = Date.now(); // Update updatedAt field

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

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUsersByQuery,
    updateUserById,
    deleteUserById
};
