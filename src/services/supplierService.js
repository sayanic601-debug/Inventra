const Supplier = require("../models/Supplier");

const createSupplier = async (supplierData) => {
    try {
        const existingSupplier = await Supplier.findOne({
            email: supplierData.email,
        });

        if (existingSupplier) {
            throw new Error("Supplier already exists");
        }

        const supplier = await Supplier.create(supplierData);

        return supplier;
    } catch (error) {
        throw error;
    }
};

const getAllSuppliers = async () => {
    const suppliers =  await Supplier.find();
     return suppliers;
};

const getSupplierById = async (id) => {
    const supplier = await Supplier.findById(id);

    if (!supplier) {
        throw new Error('Supplier not found');
    }
    return supplier;
};

const updateSupplier = async (id, supplierData) => {
    const supplier = await Supplier.findByIdAndUpdate(
        id,
        supplierData,
        { new: true,
          runValidators: true }
    );

    if (!supplier) {
        throw new Error('Supplier not found');
    }
    return supplier;
};


const deleteSupplier = async (id) => {
    const supplier = await Supplier.findByIdAndDelete(id);

    if (!supplier) {
        throw new Error('Supplier not found');
    }
    return supplier;
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};