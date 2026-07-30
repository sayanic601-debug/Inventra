const dashboardService = require("../services/dashboardService");

const getDashboardSummary = async (req, res) => {
    try {
        const data = await dashboardService.getDashboardSummary();

        res.status(200).json({
            success: true,
            data,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getLowStockProducts = async (req, res) => {
    try {
        const products = await dashboardService.getLowStockProducts();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getRecentPurchases = async (req, res) => {
    try {
        const purchases = await dashboardService.getRecentPurchases();

        res.status(200).json({
            success: true,
            data: purchases,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getRecentSales = async (req, res) => {
    try {
        const sales = await dashboardService.getRecentSales();

        res.status(200).json({
            success: true,
            data: sales,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getDashboardSummary,
    getLowStockProducts,
    getRecentPurchases,
    getRecentSales,
};