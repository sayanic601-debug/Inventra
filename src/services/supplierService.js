const Supplier = require("../models/Supplier");

// =====================================================
// CREATE SUPPLIER
// =====================================================

const createSupplier = async (supplierData) => {

    const existingSupplier = await Supplier.findOne({
        email: supplierData.email,
    });

    if (existingSupplier) {
        throw new Error("Supplier already exists");
    }

    const supplier = await Supplier.create(supplierData);

    return supplier;
};

// =====================================================
// GET ALL SUPPLIERS
// =====================================================

const getAllSuppliers = async () => {

    const suppliers = await Supplier.find().sort({
        createdAt: -1,
    });

    return suppliers;
};

// =====================================================
// GET SUPPLIER BY ID
// =====================================================

const getSupplierById = async (id) => {

    const supplier = await Supplier.findById(id);

    if (!supplier) {
        throw new Error("Supplier not found");
    }

    return supplier;
};

// =====================================================
// UPDATE SUPPLIER
// =====================================================

const updateSupplier = async (id, supplierData) => {

    if (supplierData.email) {

        const existingSupplier = await Supplier.findOne({
            email: supplierData.email,
            _id: { $ne: id },
        });

        if (existingSupplier) {
            throw new Error("Supplier already exists");
        }
    }

    const supplier = await Supplier.findByIdAndUpdate(
        id,
        supplierData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!supplier) {
        throw new Error("Supplier not found");
    }

    return supplier;
};

// =====================================================
// DELETE SUPPLIER
// =====================================================

const deleteSupplier = async (id) => {

    const supplier = await Supplier.findByIdAndDelete(id);

    if (!supplier) {
        throw new Error("Supplier not found");
    }

    return supplier;
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};