const Store = require('../models/Store');

const createStore = async (req, res) => {
    const storeData = req.body;
    try {
        const store = new Store(storeData);
        const result = await store.save();

        res.status(201)
            .json({ message: "Store created successfully", result });
    } catch (err) {
        res.status(500)
            .json({ message: "Cannot Create Store: Internal server error" });
    }
}


const getStores = async (req, res) => {
    try {
        const results = await Store.find({});
        res.status(200)
            .json({ message: "Success", data: results });
    } catch (err) {
        res.status(500)
            .json({ message: "Cannot Get Store: Internal server error" });
    }
}

const getStoreById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Store.findById(id);
        res.status(200)
            .json({ message: "Success", data: result });
    } catch (err) {
        res.status(500)
            .json({ message: "Cannot Get StorebyID: Internal server error" });
    }
}

const updateStoreById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updateDoc = { $set: { ...body } };
        updateDoc.updatedAt = Date.now();
        await Store.findByIdAndUpdate(id, updateDoc);
        res.status(200)
            .json({ message: "Store updated successfully" });
    } catch (err) {
        res.status(500)
            .json({ message: "Cannot Update StorebyID: Internal server error" });
    }
}

const deleteStoreById = async (req, res) => {
    try {
        const id = req.params.id;
        await Store.findByIdAndDelete(id);
        res.status(200)
            .json({ message: "Store deleted successfully" });
    } catch (err) {
        res.status(500)
            .json({ message: "Cannot Delete StorebyID: Internal server error" });
    }
}

const getStoreByQuery = async (req, res) => {
    const query = req.params.query;
    try {
        const result = await Store.findOne({
            $or: [
                { storeId: query },
                { storeName: query },
                { storeOwner: query } // Add querying by storeOwner
            ]
        });
        if (!result) {
            return res.status(404).json({ message: "Store not found" });
        }
        res.status(200).json({ message: "Success", data: result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    createStore,
    getStores,
    getStoreById,
    updateStoreById,
    deleteStoreById,
    getStoreByQuery
}
