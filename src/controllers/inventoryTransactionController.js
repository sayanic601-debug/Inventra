const inventoryTransactionService = require("../services/inventoryTransactionService");

const getAllTransactions = async (req, res) => {
    try {
        const transactions =
            await inventoryTransactionService.getAllTransactions();

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getTransactionsByProduct = async (req, res) => {
    try {
        const transactions =
            await inventoryTransactionService.getTransactionsByProduct(req.params.productId);

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getProductInventorySummary = async (req, res) => {
    try {
        const summary =
            await inventoryTransactionService.getProductInventorySummary(req.params.productId);

        res.status(200).json({
            success: true,
            data: summary,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getAllTransactions,
    getTransactionsByProduct,
    getProductInventorySummary,
};