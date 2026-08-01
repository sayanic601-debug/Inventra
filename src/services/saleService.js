const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const InventoryTransaction = require("../models/InventoryTransaction");

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
            customerName: customerName || existingCustomer.name,
        });

        // Reduce stock
        existingProduct.stock -= quantity;

        await existingProduct.save();

        // Create Inventory transaction
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

const getAllSales = async () => {
    const sales = await Sale.find()
        .populate("product", "name sku")
        .populate("customer", "name email phone");

    return sales;
};

const getSaleBYId = async (id) => {
    const sale = await Sale.findById(id)
        .populate("product", "name sku")
        .populate("customer", "name email phone");

    if (!sale) {
        throw new Error("Sale not found");
    }

    return sale;
};

const updateSale = async (id, saleData) => {
    try {
        const existingSale = await Sale.findById(id);

        if (!existingSale) {
            throw new Error("Sale not found");
        }

        const product = await Product.findById(existingSale.product);

        if (!product) {
            throw new Error("Product not found");
        }

        // If customer is being updated, check customer exists
        if (saleData.customer) {
            const existingCustomer = await Customer.findById(
                saleData.customer
            );

            if (!existingCustomer) {
                throw new Error("Customer not found");
            }

            existingSale.customer = saleData.customer;

            // Update customer name if not provided
            existingSale.customerName =
                saleData.customerName || existingCustomer.name;
        }

        const oldQuantity = existingSale.quantity;

        const newQuantity =
            saleData.quantity !== undefined
                ? saleData.quantity
                : oldQuantity;

        const quantityDifference = newQuantity - oldQuantity;

        // Check if enough stock is available
        // when increasing sale quantity
        if (
            quantityDifference > 0 &&
            product.stock < quantityDifference
        ) {
            throw new Error("Insufficient stock for update");
        }

        // Adjust product stock
        product.stock -= quantityDifference;

        await product.save();

        // Update sale quantity
        existingSale.quantity = newQuantity;

        // Update selling price
        if (saleData.sellingPrice !== undefined) {
            existingSale.sellingPrice = saleData.sellingPrice;
        }

        // Update customer name if provided
        if (saleData.customerName !== undefined) {
            existingSale.customerName = saleData.customerName;
        }

        // Recalculate total amount
        existingSale.totalAmount =
            existingSale.quantity *
            existingSale.sellingPrice;

        await existingSale.save();

        // Update inventory transaction
        const inventoryTransaction =
            await InventoryTransaction.findOne({
                referenceId: existingSale._id,
                referenceType: "SALE",
            });

        if (inventoryTransaction) {
            inventoryTransaction.quantity = newQuantity;

            await inventoryTransaction.save();
        }

        return existingSale;
    } catch (error) {
        throw error;
    }
};

const deleteSale = async (id) => {
    try {
        // Find sale
        const existingSale = await Sale.findById(id);

        if (!existingSale) {
            throw new Error("Sale not found");
        }

        // Find product
        const product = await Product.findById(
            existingSale.product
        );

        if (!product) {
            throw new Error("Product not found");
        }

        // Restore product stock
        product.stock += existingSale.quantity;

        await product.save();

        // Delete sale
        await Sale.findByIdAndDelete(id);

        // Delete related inventory transaction
        await InventoryTransaction.deleteOne({
            referenceId: existingSale._id,
            referenceType: "SALE",
        });

        return existingSale;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSale,
    getAllSales,
    getSaleBYId,
    updateSale,
    deleteSale,
};