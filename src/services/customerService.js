const Customer = require("../models/Customer");

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

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};