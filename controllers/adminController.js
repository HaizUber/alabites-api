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
        const uid = req.params.uid; // Extract UID from request parameters
        const result = await Admin.findOne({ uid: uid }); // Find admin by UID
        if (!result) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateAdminById = async (req, res) => {
    try {
        const uid = req.params.uid; // Extract UID from request parameters
        const body = req.body;

        // Construct update document
        const updateDoc = {
            $set: { ...body }, // Update admin details
        };
        
        // If storeId is provided in the request body, add the new store to stores array
        if (body.storeId) {
            updateDoc.$addToSet = { stores: body.storeId };
        }

        updateDoc.updatedAt = Date.now(); // Update updatedAt field

        // Find admin by UID and update
        const updatedAdmin = await Admin.findOneAndUpdate({ uid }, updateDoc, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin updated successfully", data: updatedAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteAdminById = async (req, res) => {
    try {
        const uid = req.params.uid; // Extract UID from request parameters
        const deletedAdmin = await Admin.findOneAndDelete({ uid }); // Delete admin by UID
        
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (err) {
        console.error(err);
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
