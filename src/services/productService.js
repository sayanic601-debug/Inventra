const mongoose = require("mongoose");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");

// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (productData) => {
    // Check duplicate SKU
    const existingProduct = await Product.findOne({
        sku: productData.sku,
    });

    if (existingProduct) {
        throw new Error("Product with this SKU already exists");
    }

    // Validate Category
    const category = await Category.findById(productData.category);

    if (!category) {
        throw new Error("Category not found");
    }

    // Validate Supplier
    const supplier = await Supplier.findById(productData.supplier);

    if (!supplier) {
        throw new Error("Supplier not found");
    }

    // Create Product
    const product = await Product.create(productData);

    return product;
};


// =====================================================
// GET ALL PRODUCTS
// Supports:
// - Search by product name or SKU
// - Filter by category name
// - Filter by supplier name
// - Sorting
// - Pagination
// =====================================================

const getAllProducts = async (query = {}) => {
    const filter = {};

    // -----------------------------
    // Search by Product Name or SKU
    // -----------------------------

    if (query.search) {
        filter.$or = [
            {
                name: {
                    $regex: query.search,
                    $options: "i",
                },
            },
            {
                sku: {
                    $regex: query.search,
                    $options: "i",
                },
            },
        ];
    }


    // -----------------------------
    // Filter by Category Name
    // -----------------------------

    if (query.category) {
        const category = await Category.findOne({
            name: {
                $regex: query.category,
                $options: "i",
            },
        });

        if (!category) {
            return {
                products: [],
                totalProducts: 0,
                currentPage: Number(query.page) || 1,
                totalPages: 0,
                limit: Number(query.limit) || 10,
            };
        }

        filter.category = category._id;
    }


    // -----------------------------
    // Filter by Supplier Name
    // -----------------------------

    if (query.supplier) {
        const supplier = await Supplier.findOne({
            name: {
                $regex: query.supplier,
                $options: "i",
            },
        });

        if (!supplier) {
            return {
                products: [],
                totalProducts: 0,
                currentPage: Number(query.page) || 1,
                totalPages: 0,
                limit: Number(query.limit) || 10,
            };
        }

        filter.supplier = supplier._id;
    }


    // -----------------------------
    // Sorting
    // -----------------------------

    let sortOption = {
        createdAt: -1,
    };

    if (query.sort === "price_asc") {
        sortOption = {
            sellingPrice: 1,
        };
    }

    if (query.sort === "price_desc") {
        sortOption = {
            sellingPrice: -1,
        };
    }

    if (query.sort === "newest") {
        sortOption = {
            createdAt: -1,
        };
    }

    if (query.sort === "oldest") {
        sortOption = {
            createdAt: 1,
        };
    }


    // -----------------------------
    // Pagination
    // -----------------------------

    const page = Math.max(
        Number(query.page) || 1,
        1
    );

    const limit = Math.max(
        Number(query.limit) || 10,
        1
    );

    const skip = (page - 1) * limit;


    // -----------------------------
    // Count Total Products
    // -----------------------------

    const totalProducts = await Product.countDocuments(filter);


    // -----------------------------
    // Get Products
    // -----------------------------

    const products = await Product.find(filter)
        .populate(
            "category",
            "name description"
        )
        .populate(
            "supplier",
            "name email phone companyName"
        )
        .sort(sortOption)
        .skip(skip)
        .limit(limit);


    // -----------------------------
    // Calculate Total Pages
    // -----------------------------

    const totalPages = Math.ceil(
        totalProducts / limit
    );


    return {
        products,
        totalProducts,
        currentPage: page,
        totalPages,
        limit,
    };
};


// =====================================================
// GET PRODUCT BY ID
// =====================================================

const getProductById = async (id) => {

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product ID");
    }

    const product = await Product.findById(id)
        .populate(
            "category",
            "name description"
        )
        .populate(
            "supplier",
            "name email phone companyName"
        );

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


// =====================================================
// UPDATE PRODUCT
// =====================================================

const updateProduct = async (id, productData) => {

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product ID");
    }


    // Find existing product
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
        throw new Error("Product not found");
    }


    // -----------------------------
    // Check Duplicate SKU
    // -----------------------------

    if (productData.sku) {

        const duplicateSKU = await Product.findOne({
            sku: productData.sku,
            _id: {
                $ne: id,
            },
        });

        if (duplicateSKU) {
            throw new Error(
                "Product with this SKU already exists"
            );
        }
    }


    // -----------------------------
    // Validate Category
    // -----------------------------

    if (productData.category) {

        const category = await Category.findById(
            productData.category
        );

        if (!category) {
            throw new Error("Category not found");
        }
    }


    // -----------------------------
    // Validate Supplier
    // -----------------------------

    if (productData.supplier) {

        const supplier = await Supplier.findById(
            productData.supplier
        );

        if (!supplier) {
            throw new Error("Supplier not found");
        }
    }


    // -----------------------------
    // Update Product
    // -----------------------------

    const updatedProduct =
        await Product.findByIdAndUpdate(
            id,
            productData,
            {
                new: true,
                runValidators: true,
            }
        )
        .populate(
            "category",
            "name description"
        )
        .populate(
            "supplier",
            "name email phone companyName"
        );


    return updatedProduct;
};


// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (id) => {

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid product ID");
    }


    // Find and Delete Product
    const product =
        await Product.findByIdAndDelete(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};