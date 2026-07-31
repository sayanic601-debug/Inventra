const customerService = require("../services/customerService");

const createCustomer = async (req, res) => {
    try {
        const customer = await customerService.createCustomer(req.body);

        res.status(201).json({
            success: true,
            message: "Customer created successfully",
            data: customer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerService.getAllCustomers();

        res.status(200).json({
            success: true,
            count: customers.length,
            data: customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await customerService.getCustomerById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: customer,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await customerService.updateCustomer(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await customerService.deleteCustomer(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
            data: customer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};