const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const InventoryTransaction = require("../models/InventoryTransaction");

const createPurchase = async (purchaseData) => {
    try {
        const { product, supplier, quantity, purchasePrice } = purchaseData;

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

        //  Create Inventory transaction 
        await InventoryTransaction.create({
            product: product,
            type: "STOCK_IN",
            quantity: quantity,
            referenceType: "PURCHASE",
            referenceId: purchase._id,
            note: "Stock added through purchase",
        });

        return purchase;
    } catch (error) {
        throw error;
    }
};

const getAllPurchases = async () => {
    const purchases = await Purchase.find()
        .populate("product", "name")
        .populate("supplier", "name companyName");
    return purchases;
};

const getPurchaseById = async (id) => {
    const purchase = await Purchase.findById(id)
        .populate("product", "name")
        .populate("supplier", "name companyName");

    if (!purchase) {
        throw new Error("Purchase not found");
    }

    return purchase;
};

const updatePurchase = async (id, purchaseData) => {
    try {
        const existingPurchase = await Purchase.findById(id);

        if (!existingPurchase) {
            throw new Error("Purchase not found");
        }

        const product = await Product.findById(existingPurchase.product);

        if (!product) {
            throw new Error("Product not found");
        }

        const oldQuantity = existingPurchase.quantity;

        const newQuantity =
            purchaseData.quantity !== undefined
                ? purchaseData.quantity
                : oldQuantity;

        // Calculate quantity difference
        const quantityDifference = newQuantity - oldQuantity;

        // Update product stock
        product.stock += quantityDifference;

        // Update purchase price
        if (purchaseData.purchasePrice !== undefined) {
            product.purchasePrice = purchaseData.purchasePrice;
        }

        await product.save();

        // Update purchase record
        existingPurchase.quantity = newQuantity;

        if (purchaseData.purchasePrice !== undefined) {
            existingPurchase.purchasePrice = purchaseData.purchasePrice;
        }

        existingPurchase.totalAmount =
            existingPurchase.quantity * existingPurchase.purchasePrice;

        await existingPurchase.save();

        // Update inventory transaction
        const inventoryTransaction =
            await InventoryTransaction.findOne({
                referenceId: existingPurchase._id,
                referenceType: "PURCHASE",
            });

        if (inventoryTransaction) {
            inventoryTransaction.quantity = newQuantity;
            await inventoryTransaction.save();
        } else {
            await InventoryTransaction.create({
                product: existingPurchase.product,
                type: "STOCK_IN",
                quantity: newQuantity,
                referenceType: "PURCHASE",
                referenceId: existingPurchase._id,
                note: "Stock added through purchase update",
            });
        }

        return existingPurchase;

    } catch (error) {
        throw error;
    }
};

const deletePurchase = async (id) => {
    try {
        const existingPurchase = await Purchase.findById(id);

        if (!existingPurchase) {
            throw new Error("Purchase not found");
        }

        const product = await Product.findById(existingPurchase.product);

        if (!product) {
            throw new Error("Product not found");
        }

        // Check if enough stock is available to reverse the purchase
        if (product.stock < existingPurchase.quantity) {
            throw new Error(
                "Cannot delete purchase because current stock is less than purchased quantity"
            );
        }

        // Reverse the stock
        product.stock -= existingPurchase.quantity;

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



module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
};