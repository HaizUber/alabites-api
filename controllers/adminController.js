const Admin = require('../models/Admin');

const createAdmin = async (req, res) => {
    const body = req.body;
    console.log('userInfo ', req.userInfo);
    try {
        const admin = new Admin(body);
        const result = await admin.save();
        res.status(201)
            .json({ message: "Admin created successfully", result });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getAdmins = async (req, res) => {
    try {
        const results = await Admin.find({});
        res.status(200)
            .json({ message: "Success", data: results });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getAdminById = async (req, res) => {
    try {
        const uid = req.params.id; // Change id to uid
        const result = await Admin.findOne({ uid }); // Find admin by uid
        if (!result) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateAdminById = async (req, res) => {
    try {
        const uid = req.params.uid; // Change id to uid
        const body = req.body;
        const updateDoc = { $set: { ...body } };
        updateDoc.updatedAt = Date.now();
        // Find admin by uid and update
        await Admin.findOneAndUpdate({ uid }, updateDoc);
        res.status(200)
            .json({ message: "Admin updated successfully" });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const deleteAdminById = async (req, res) => {
    try {
        const uid = req.params.id; // Change id to uid
        await Admin.findOneAndDelete({ uid }); // Delete admin by uid
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

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
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    createAdmin,
    getAdmins,
    getAdminById,
    getAdminByQuery,
    updateAdminById,
    deleteAdminById
}
