const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const InventoryTransaction = require("../models/InventoryTransaction");

// =====================================================
// CREATE PURCHASE
// =====================================================

const createPurchase = async (purchaseData) => {
    try {
        const {
            product,
            supplier,
            quantity,
            purchasePrice,
        } = purchaseData;

        // Check product exists
        const existingProduct = await Product.findById(product);

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        // Check supplier exists
        const existingSupplier = await Supplier.findById(supplier);

        if (!existingSupplier) {
            throw new Error("Supplier not found");
        }

        // Calculate total amount
        const totalAmount = quantity * purchasePrice;

        // Create purchase record
        const purchase = await Purchase.create({
            product,
            supplier,
            quantity,
            purchasePrice,
            totalAmount,
        });

        // Increase product stock
        existingProduct.stock += quantity;

        // Update purchase price
        existingProduct.purchasePrice = purchasePrice;

        await existingProduct.save();

        // Create inventory transaction
        await InventoryTransaction.create({
            product,
            type: "STOCK_IN",
            quantity,
            referenceType: "PURCHASE",
            referenceId: purchase._id,
            note: "Stock added through purchase",
        });

        return purchase;

    } catch (error) {
        throw error;
    }
};


// =====================================================
// GET ALL PURCHASES
// Supports:
// - Search by Product Name / SKU
// - Product Filter
// - Supplier Filter
// - Date Range Filter
// - Sorting
// - Pagination
// =====================================================

const getAllPurchases = async (query = {}) => {
    try {
        const filter = {};

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
        // Search by Product Name / SKU
        // -----------------------------

        if (query.search) {

            const matchingProducts = await Product.find({
                $or: [
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
                ],
            }).select("_id");

            const productIds = matchingProducts.map(
                (product) => product._id
            );

            // If no products match search
            if (productIds.length === 0) {
                return {
                    purchases: [],
                    totalPurchases: 0,
                    currentPage: page,
                    totalPages: 0,
                    limit,
                };
            }

            filter.product = {
                $in: productIds,
            };
        }


        // -----------------------------
        // Filter by Product ID
        // -----------------------------

        if (query.product) {
            filter.product = query.product;
        }


        // -----------------------------
        // Filter by Supplier ID
        // -----------------------------

        if (query.supplier) {
            filter.supplier = query.supplier;
        }


        // -----------------------------
        // Filter by Status
        // -----------------------------
        if (query.status) {
            filter.status = query.status;
        }


        // -----------------------------
        // Date Range Filter
        // -----------------------------
        // Assuming Purchase model has
        // purchaseDate field.
        // If not, use createdAt instead.
        // -----------------------------

        if (query.startDate || query.endDate) {

            filter.purchaseDate = {};

            if (query.startDate) {

                const startDate = new Date(
                    query.startDate
                );

                filter.purchaseDate.$gte = startDate;
            }

            if (query.endDate) {

                const endDate = new Date(
                    query.endDate
                );

                // Include complete end date
                endDate.setHours(
                    23,
                    59,
                    59,
                    999
                );

                filter.purchaseDate.$lte = endDate;
            }
        }


        // -----------------------------
        // Sorting
        // -----------------------------

        let sortOption = {
            purchaseDate: -1,
        };

        if (query.sort === "newest") {
            sortOption = {
                purchaseDate: -1,
            };
        }

        if (query.sort === "oldest") {
            sortOption = {
                purchaseDate: 1,
            };
        }

        if (query.sort === "price_asc") {
            sortOption = {
                purchasePrice: 1,
            };
        }

        if (query.sort === "price_desc") {
            sortOption = {
                purchasePrice: -1,
            };
        }

        if (query.sort === "amount_asc") {
            sortOption = {
                totalAmount: 1,
            };
        }

        if (query.sort === "amount_desc") {
            sortOption = {
                totalAmount: -1,
            };
        }




        // -----------------------------
        // Count Total Matching Purchases
        // -----------------------------

        const totalPurchases =
            await Purchase.countDocuments(filter);


        // -----------------------------
        // Get Purchases
        // -----------------------------

        const purchases = await Purchase.find(filter)
            .populate(
                "product",
                "name sku"
            )
            .populate(
                "supplier",
                "name companyName"
            )
            .sort(sortOption)
            .skip(skip)
            .limit(limit);


        // -----------------------------
        // Calculate Total Pages
        // -----------------------------

        const totalPages = Math.ceil(
            totalPurchases / limit
        );


        return {
            purchases,
            totalPurchases,
            currentPage: page,
            totalPages,
            limit,
        };

    } catch (error) {
        throw error;
    }
};


// =====================================================
// GET PURCHASE BY ID
// =====================================================

const getPurchaseById = async (id) => {

    const purchase = await Purchase.findById(id)
        .populate(
            "product",
            "name sku"
        )
        .populate(
            "supplier",
            "name companyName"
        );

    if (!purchase) {
        throw new Error("Purchase not found");
    }

    return purchase;
};


// =====================================================
// UPDATE PURCHASE
// =====================================================

const updatePurchase = async (
    id,
    purchaseData
) => {
    try {

        // Find existing purchase
        const existingPurchase =
            await Purchase.findById(id);

        if (!existingPurchase) {
            throw new Error("Purchase not found");
        }


        // Find product
        const product =
            await Product.findById(
                existingPurchase.product
            );

        if (!product) {
            throw new Error("Product not found");
        }


        // -----------------------------
        // Calculate Quantity Difference
        // -----------------------------

        const oldQuantity =
            existingPurchase.quantity;

        const newQuantity =
            purchaseData.quantity !== undefined
                ? purchaseData.quantity
                : oldQuantity;

        const quantityDifference =
            newQuantity - oldQuantity;


        // -----------------------------
        // Update Product Stock
        // -----------------------------

        product.stock += quantityDifference;


        // -----------------------------
        // Update Purchase Price
        // -----------------------------

        if (
            purchaseData.purchasePrice !== undefined
        ) {
            product.purchasePrice =
                purchaseData.purchasePrice;
        }

        await product.save();


        // -----------------------------
        // Update Purchase Record
        // -----------------------------

        existingPurchase.quantity =
            newQuantity;

        if (
            purchaseData.purchasePrice !== undefined
        ) {
            existingPurchase.purchasePrice =
                purchaseData.purchasePrice;
        }


        // Recalculate total amount
        existingPurchase.totalAmount =
            existingPurchase.quantity *
            existingPurchase.purchasePrice;

        await existingPurchase.save();


        // -----------------------------
        // Update Inventory Transaction
        // -----------------------------

        const inventoryTransaction =
            await InventoryTransaction.findOne({
                referenceId:
                    existingPurchase._id,

                referenceType:
                    "PURCHASE",
            });


        if (inventoryTransaction) {

            inventoryTransaction.quantity =
                newQuantity;

            await inventoryTransaction.save();

        } else {

            await InventoryTransaction.create({
                product:
                    existingPurchase.product,

                type: "STOCK_IN",

                quantity:
                    newQuantity,

                referenceType:
                    "PURCHASE",

                referenceId:
                    existingPurchase._id,

                note:
                    "Stock added through purchase update",
            });
        }


        return existingPurchase;

    } catch (error) {
        throw error;
    }
};


// =====================================================
// DELETE PURCHASE
// =====================================================

const deletePurchase = async (id) => {
    try {

        // Find existing purchase
        const existingPurchase =
            await Purchase.findById(id);

        if (!existingPurchase) {
            throw new Error("Purchase not found");
        }


        // Find product
        const product =
            await Product.findById(
                existingPurchase.product
            );

        if (!product) {
            throw new Error("Product not found");
        }


        // Check if enough stock is available
        // to reverse the purchase
        if (
            product.stock <
            existingPurchase.quantity
        ) {
            throw new Error(
                "Cannot delete purchase because current stock is less than purchased quantity"
            );
        }


        // Reverse stock
        product.stock -=
            existingPurchase.quantity;

        await product.save();


        // Delete purchase record
        await Purchase.findByIdAndDelete(id);


        // Delete related inventory transaction
        await InventoryTransaction.deleteOne({
            referenceId: id,
            referenceType: "PURCHASE",
        });


        return existingPurchase;

    } catch (error) {
        throw error;
    }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
};