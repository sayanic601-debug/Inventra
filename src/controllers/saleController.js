const saleService = require("../services/saleService");

const createSale = async (req, res) => {
    try {
        const sale = await saleService.createSale(req.body);

        res.status(201).json({
            success: true,
            message: "Sale created successfully",
            data: sale,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllSales = async (req, res) => {
    try {
        const result =
            await saleService.getAllSales(req.query);

        res.status(200).json({
            success: true,
            count: result.sales.length,
            totalSales: result.totalSales,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            limit: result.limit,
            data: result.sales,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getSaleBYId = async (req, res) => {
    try {
        const sale = await saleService.getSaleBYId(req.params.id);

        res.status(200).json({
            success: true,
            data: sale,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateSale = async (req, res) => {
    try {
        const sale = await saleService.updateSale(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Sale updated successfully",
            data: sale,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteSale = async (req, res) => {
    try {
        const sale = await saleService.deleteSale(req.params.id);

        res.status(200).json({
            success: true,
            message: "Sale deleted successfully",
            data: sale,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSale,
    getAllSales,
    getSaleBYId,
    updateSale,
    deleteSale,
};