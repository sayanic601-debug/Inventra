const InventoryTransaction = require("../models/InventoryTransaction");
const Product = require("../models/Product");

const getAllTransactions = async () => {
    const transactions = await InventoryTransaction.find()
        .populate("product", "name sku")
        .sort({ createdAt: -1 });

    return transactions;
};

const getTransactionsByProduct = async (productId) => {
    const transactions = await InventoryTransaction.find({ product: productId })
        .populate("product", "name sku")
        .sort({ createdAt: -1 });

    return transactions;
};

const getProductInventorySummary = async (productId) => {
    const product = await Product.findById(productId)
        .select("name sku stock");

    if (!product) {
        throw new Error("Product not found");
    }

    const transactions = await InventoryTransaction.find({
        product: productId,
    });

    let totalStockIn = 0;
    let totalStockOut = 0;

    transactions.forEach((transaction) => {
        if (transaction.type === "STOCK_IN") {
            totalStockIn += transaction.quantity;
        }

        if (transaction.type === "STOCK_OUT") {
            totalStockOut += transaction.quantity;
        }
    });

    return {
        product: {
            name: product.name,
            sku: product.sku,
        },
        currentStock: product.stock,
        totalStockIn: totalStockIn,
        totalStockOut: totalStockOut,
        netMovement: totalStockIn - totalStockOut,
    };
};
module.exports = {
    getAllTransactions,
    getTransactionsByProduct,
    getProductInventorySummary,
};