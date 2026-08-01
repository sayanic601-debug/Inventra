const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");


// Create Product
const createProduct = async (productData) => {
    try {
        const existingProduct = await Product.findOne({
            sku: productData.sku,
        });

        if (existingProduct) {
            throw new Error("Product already exists");
        }

        const product = await Product.create(productData);

        return product;
    } catch (error) {
        throw error;
    }
};


// Get All Products
// Supports:
// - Search by product name or SKU
// - Filter by category name
// - Filter by supplier name
// - Sorting
// - Pagination

const getAllProducts = async (query = {}) => {
    try {
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
                };
            }

            filter.supplier = supplier._id;
        }


        // -----------------------------
        // Sorting
        // -----------------------------
        let sortOption = {};

        if (query.sort === "price_asc") {
            sortOption.sellingPrice = 1;
        } else if (query.sort === "price_desc") {
            sortOption.sellingPrice = -1;
        } else if (query.sort === "newest") {
            sortOption.createdAt = -1;
        } else if (query.sort === "oldest") {
            sortOption.createdAt = 1;
        } else {
            // Default sorting
            sortOption.createdAt = -1;
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
        // Count Total Matching Products
        // -----------------------------
        const totalProducts =
            await Product.countDocuments(filter);


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

    } catch (error) {
        throw error;
    }
};


// Get Product By ID
const getProductById = async (id) => {
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


// Update Product
const updateProduct = async (
    id,
    productData
) => {
    const product =
        await Product.findByIdAndUpdate(
            id,
            productData,
            {
                new: true,
                runValidators: true,
            }
        );

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


// Delete Product
const deleteProduct = async (id) => {
    const product =
        await Product.findByIdAndDelete(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};