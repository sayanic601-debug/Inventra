const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const InventoryTransaction = require("../models/InventoryTransaction");


// =====================================================
// CREATE SALE
// =====================================================

const createSale = async (saleData) => {
    try {
        const {
            product,
            customer,
            quantity,
            sellingPrice,
            customerName,
        } = saleData;

        // Check product exists
        const existingProduct = await Product.findById(product);

        if (!existingProduct) {
            throw new Error("Product not found");
        }

        // Check customer exists
        const existingCustomer = await Customer.findById(customer);

        if (!existingCustomer) {
            throw new Error("Customer not found");
        }

        // Check stock availability
        if (existingProduct.stock < quantity) {
            throw new Error("Insufficient stock");
        }

        // Calculate total amount
        const totalAmount = quantity * sellingPrice;

        // Create sale
        const sale = await Sale.create({
            product,
            customer,
            quantity,
            sellingPrice,
            totalAmount,
            customerName:
                customerName || existingCustomer.name,
        });

        // Reduce product stock
        existingProduct.stock -= quantity;

        await existingProduct.save();

        // Create inventory transaction
        await InventoryTransaction.create({
            product,
            type: "STOCK_OUT",
            quantity,
            referenceType: "SALE",
            referenceId: sale._id,
            note: "Stock sold through sale",
        });

        return sale;

    } catch (error) {
        throw error;
    }
};


// =====================================================
// GET ALL SALES
// Supports:
// - Customer Filter
// - Product Filter
// - Date Range Filter
// - Sorting
// - Pagination
// =====================================================

const getAllSales = async (query = {}) => {
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
        // Filter by Customer ID
        // -----------------------------

        if (query.customer) {
            filter.customer = query.customer;
        }


        // -----------------------------
        // Filter by Product ID
        // -----------------------------

        if (query.product) {
            filter.product = query.product;
        }


        // -----------------------------
        // Date Range Filter
        // -----------------------------

        if (query.startDate || query.endDate) {
            filter.saleDate = {};

            if (query.startDate) {
                const startDate = new Date(
                    query.startDate
                );

                filter.saleDate.$gte = startDate;
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

                filter.saleDate.$lte = endDate;
            }
        }


        // -----------------------------
        // Sorting
        // -----------------------------

        let sortOption = {
            saleDate: -1,
        };

        if (query.sort === "newest") {
            sortOption = {
                saleDate: -1,
            };
        }

        if (query.sort === "oldest") {
            sortOption = {
                saleDate: 1,
            };
        }

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
        // Count Total Sales
        // -----------------------------

        const totalSales =
            await Sale.countDocuments(filter);


        // -----------------------------
        // Get Sales
        // -----------------------------

        const sales = await Sale.find(filter)
            .populate(
                "product",
                "name sku"
            )
            .populate(
                "customer",
                "name email phone"
            )
            .sort(sortOption)
            .skip(skip)
            .limit(limit);


        // -----------------------------
        // Calculate Total Pages
        // -----------------------------

        const totalPages = Math.ceil(
            totalSales / limit
        );


        return {
            sales,
            totalSales,
            currentPage: page,
            totalPages,
            limit,
        };

    } catch (error) {
        throw error;
    }
};


// =====================================================
// GET SALE BY ID
// =====================================================

const getSaleBYId = async (id) => {
    const sale = await Sale.findById(id)
        .populate(
            "product",
            "name sku"
        )
        .populate(
            "customer",
            "name email phone"
        );

    if (!sale) {
        throw new Error("Sale not found");
    }

    return sale;
};


// =====================================================
// UPDATE SALE
// =====================================================

const updateSale = async (id, saleData) => {
    try {
        // Find existing sale
        const existingSale =
            await Sale.findById(id);

        if (!existingSale) {
            throw new Error("Sale not found");
        }


        // Find product
        const product =
            await Product.findById(
                existingSale.product
            );

        if (!product) {
            throw new Error("Product not found");
        }


        // -----------------------------
        // Update Customer
        // -----------------------------

        if (saleData.customer) {
            const existingCustomer =
                await Customer.findById(
                    saleData.customer
                );

            if (!existingCustomer) {
                throw new Error(
                    "Customer not found"
                );
            }

            existingSale.customer =
                saleData.customer;

            existingSale.customerName =
                saleData.customerName ||
                existingCustomer.name;
        }


        // -----------------------------
        // Calculate Quantity Difference
        // -----------------------------

        const oldQuantity =
            existingSale.quantity;

        const newQuantity =
            saleData.quantity !== undefined
                ? saleData.quantity
                : oldQuantity;

        const quantityDifference =
            newQuantity - oldQuantity;


        // -----------------------------
        // Check Stock
        // -----------------------------

        if (
            quantityDifference > 0 &&
            product.stock < quantityDifference
        ) {
            throw new Error(
                "Insufficient stock for update"
            );
        }


        // -----------------------------
        // Adjust Product Stock
        // -----------------------------

        product.stock -= quantityDifference;

        await product.save();


        // -----------------------------
        // Update Sale Quantity
        // -----------------------------

        existingSale.quantity =
            newQuantity;


        // -----------------------------
        // Update Selling Price
        // -----------------------------

        if (
            saleData.sellingPrice !== undefined
        ) {
            existingSale.sellingPrice =
                saleData.sellingPrice;
        }


        // -----------------------------
        // Update Customer Name
        // -----------------------------

        if (
            saleData.customerName !== undefined
        ) {
            existingSale.customerName =
                saleData.customerName;
        }


        // -----------------------------
        // Recalculate Total Amount
        // -----------------------------

        existingSale.totalAmount =
            existingSale.quantity *
            existingSale.sellingPrice;


        // Save Updated Sale
        await existingSale.save();


        // -----------------------------
        // Update Inventory Transaction
        // -----------------------------

        const inventoryTransaction =
            await InventoryTransaction.findOne({
                referenceId:
                    existingSale._id,

                referenceType:
                    "SALE",
            });

        if (inventoryTransaction) {
            inventoryTransaction.quantity =
                newQuantity;

            await inventoryTransaction.save();
        }


        return existingSale;

    } catch (error) {
        throw error;
    }
};


// =====================================================
// DELETE SALE
// =====================================================

const deleteSale = async (id) => {
    try {
        // Find sale
        const existingSale =
            await Sale.findById(id);

        if (!existingSale) {
            throw new Error(
                "Sale not found"
            );
        }


        // Find product
        const product =
            await Product.findById(
                existingSale.product
            );

        if (!product) {
            throw new Error(
                "Product not found"
            );
        }


        // -----------------------------
        // Restore Product Stock
        // -----------------------------

        product.stock +=
            existingSale.quantity;

        await product.save();


        // -----------------------------
        // Delete Sale
        // -----------------------------

        await Sale.findByIdAndDelete(id);


        // -----------------------------
        // Delete Inventory Transaction
        // -----------------------------

        await InventoryTransaction.deleteOne({
            referenceId:
                existingSale._id,

            referenceType:
                "SALE",
        });


        return existingSale;

    } catch (error) {
        throw error;
    }
};


// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    createSale,
    getAllSales,
    getSaleBYId,
    updateSale,
    deleteSale,
};