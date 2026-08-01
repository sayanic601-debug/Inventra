const purchaseService = require("../services/purchaseService");

const createPurchase = async (req, res) => {
    try {
        const purchase = await purchaseService.createPurchase(req.body);

        res.status(201).json({
            success: true,
            message: "Purchase created successfully",
            data: purchase,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllPurchases = async (req, res) => {
    try {
        const result =
            await purchaseService.getAllPurchases(
                req.query
            );

        res.status(200).json({
            success: true,
            count: result.purchases.length,
            totalPurchases: result.totalPurchases,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            limit: result.limit,
            data: result.purchases,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getPurchaseById = async (req,res) => {
    try {
        const purchase = await purchaseService.getPurchaseById(req.params.id);
        res.status(200).json({
            success: true,
            data: purchase,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
const updatePurchase = async (req,res) => {
    try{
        const purchase = await purchaseService.updatePurchase(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Purchase updated successfully",
            data: purchase,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
    };

    const deletePurchase = async (req,res) => {
        try {
            const purchase = await purchaseService.deletePurchase(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Purchase deleted successfully",
            data: purchase,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};



module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
};