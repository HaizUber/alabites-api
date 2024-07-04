const Admin = require('../models/Admin');
const User = require('../models/User'); // Ensure User model is defined

const createAdmin = async (req, res) => {
    const body = req.body;
    console.log('userInfo', req.userInfo);
    try {
        const admin = new Admin(body);
        const result = await admin.save();
        res.status(201).json({ message: "Admin created successfully", result });
    } catch (err) {
        console.error('Error creating admin:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAdmins = async (req, res) => {
    try {
        const results = await Admin.find({});
        res.status(200).json({ message: "Success", data: results });
    } catch (err) {
        console.error('Error fetching admins:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAdminById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const result = await Admin.findOne({ uid });
        if (!result) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        console.error('Error fetching admin by ID:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateAdminById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const body = req.body;

        const updateDoc = {
            $set: {
                firstName: body.firstName,
                lastName: body.lastName,
                username: body.username,
                avatar: body.avatar,
                aboutMe: body.aboutMe
            },
            updatedAt: Date.now()
        };

        const updatedAdmin = await Admin.findOneAndUpdate({ uid }, updateDoc, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin updated successfully", data: updatedAdmin });
    } catch (err) {
        console.error('Error updating admin:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteAdminById = async (req, res) => {
    try {
        const uid = req.params.uid;
        const deletedAdmin = await Admin.findOneAndDelete({ uid });

        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        console.error('Error deleting admin:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAdminByQuery = async (req, res) => {
    const query = req.params.query;
    try {
        const result = await Admin.findOne({
            $or: [
                { uid: query },
                { firebaseUID: query },
                { email: query },
                { username: query },
                { role: query }
            ]
        });
        if (!result) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        console.error('Error fetching admin by query:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addCurrencyToUser = async (req, res) => {
    const { uid, amount, description } = req.body;
    try {
        const user = await User.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.addCurrency(amount, description); // Using the new addCurrency method
        res.status(200).json({ message: "Currency added", data: user });
    } catch (error) {
        console.error("Error adding currency:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateAboutMe = async (req, res) => {
    try {
        const uid = req.params.uid;
        const { aboutMe } = req.body;

        const updateDoc = {
            $set: {
                aboutMe,
                updatedAt: Date.now()
            }
        };

        const updatedAdmin = await Admin.findOneAndUpdate({ uid }, updateDoc, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Ensure 'aboutMe' is included in the returned data
        const { _id, ...adminData } = updatedAdmin.toObject(); // Exclude _id from response if not needed

        res.status(200).json({ message: "About me section updated successfully", data: { ...adminData, aboutMe } });
    } catch (err) {
        console.error('Error updating about me section:', err);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    createAdmin,
    getAdmins,
    getAdminById,
    getAdminByQuery,
    updateAdminById,
    deleteAdminById,
    addCurrencyToUser,
    updateAboutMe,
};
