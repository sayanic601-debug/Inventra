const supplierService = require("../services/supplierService");

const createSupplier = async (req, res) => {
    try {
        const supplier = await supplierService.createSupplier(req.body);

        res.status(201).json({
            success: true,
            message: "Supplier created successfully",
            data: supplier,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplierService.getAllSuppliers();
        res.status(200).json({
            success: true,
            count: suppliers.length,
            data: suppliers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getSupplierById = async (req, res) => {
    try {
        const supplier = await supplierService.getSupplierById(req.params.id);
        res.status(200).json({
            success: true,
            data: supplier,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


const updateSupplier = async (req, res) => {
    try {
        const supplier = await supplierService.updateSupplier(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Supplier updated successfully",
            data: supplier,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        const supplier = await supplierService.deleteSupplier(req.params.id);
        res.status(200).json({
            success: true,
            message: "Supplier deleted successfully",
            data: supplier,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};