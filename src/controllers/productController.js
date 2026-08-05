const productService = require("../services/productService");

// =====================================================
// CREATE PRODUCT
// =====================================================

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {

        // Validation / Duplicate / Category / Supplier error
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// GET ALL PRODUCTS
// =====================================================

const getAllProducts = async (req, res) => {
    try {
        const result =
            await productService.getAllProducts(
                req.query
            );

        res.status(200).json({
            success: true,
            count: result.products.length,
            totalProducts: result.totalProducts,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            limit: result.limit,
            data: result.products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// GET PRODUCT BY ID
// =====================================================

const getProductById = async (req, res) => {
    try {
        const product =
            await productService.getProductById(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {

        // Invalid MongoDB ObjectId
        if (error.message === "Invalid product ID") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        // Product not found
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// UPDATE PRODUCT
// =====================================================

const updateProduct = async (req, res) => {
    try {
        const product =
            await productService.updateProduct(
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });

    } catch (error) {

        // Invalid ID
        if (error.message === "Invalid product ID") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        // Product / Category / Supplier not found
        if (
            error.message === "Product not found" ||
            error.message === "Category not found" ||
            error.message === "Supplier not found"
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        // Duplicate SKU / Validation error
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });

    } catch (error) {

        // Invalid ID
        if (error.message === "Invalid product ID") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        // Product not found
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
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