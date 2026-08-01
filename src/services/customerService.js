const Customer = require("../models/Customer");
const Sale = require("../models/Sale")

const createCustomer = async (customerData) => {
    try {
        const { name, email, phone, address } = customerData;

        const existingCustomer = await Customer.findOne({ phone });

        if (existingCustomer) {
            throw new Error("Customer with this phone number already exists");
        }

        const customer = await Customer.create({
            name,
            email,
            phone,
            address,
        });

        return customer;
    } catch (error) {
        throw error;
    }
};

const getAllCustomers = async () => {
    try {
        return await Customer.find().sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
};

const getCustomerById = async (id) => {
    try {
        const customer = await Customer.findById(id);

        if (!customer) {
            throw new Error("Customer not found");
        }

        return customer;
    } catch (error) {
        throw error;
    }
};

const updateCustomer = async (id, updateData) => {
    try {
        const customer = await Customer.findById(id);

        if (!customer) {
            throw new Error("Customer not found");
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            updateData,
            {
                returnDocument:"after",
                runValidators: true,
            }
        );

        return updatedCustomer;
    } catch (error) {
        throw error;
    }
};

const deleteCustomer = async (id) => {
    try {
        const customer = await Customer.findById(id);

        if (!customer) {
            throw new Error("Customer not found");
        }

        await Customer.findByIdAndDelete(id);

        return customer;
    } catch (error) {
        throw error;
    }
};

const getCustomerPurchaseHistory = async (customerId) => {
    try {
        const customer = await Customer.findById(customerId);

        if (!customer) {
            throw new Error("Customer not found");
        }

        const sales = await Sale.find({
            customer: customerId,
        })
            .populate("product", "name sku")
            .sort({ createdAt: -1 });

        return sales;
    } catch (error) {
        throw error;
    }
};


const getCustomerSummary = async (customerId) => {
    try {
        // Check customer exists
        const customer = await Customer.findById(customerId);

        if (!customer) {
            throw new Error("Customer not found");
        }

        // Get all sales of this customer
        const sales = await Sale.find({
            customer: customerId,
        });

        // Calculate total orders
        const totalOrders = sales.length;

        // Calculate total items purchased
        const totalItemsPurchased = sales.reduce(
            (total, sale) => total + sale.quantity,
            0
        );

        // Calculate total amount spent
        const totalSpent = sales.reduce(
            (total, sale) => total + sale.totalAmount,
            0
        );

        return {
            customer: customer.name,
            totalOrders,
            totalItemsPurchased,
            totalSpent,
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getCustomerPurchaseHistory,
    getCustomerSummary,
};