const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");

const getDashboardSummary = async () => {
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const totalPurchases = await Purchase.countDocuments();

    const totalSales = await Sale.countDocuments();

    const salesRevenue = await Sale.aggregate([
    {
        $group: {
            _id: null,
            total: {
                $sum: "$totalAmount"
            }
        }
    }
]);

const purchaseCost = await Purchase.aggregate([
    {
        $group: {
            _id: null,
            total: {
                $sum: "$totalAmount"
            }
        }
    }
]);

    const stockValue = await Product.aggregate([
        {
            $project: {
                value: {
                    $multiply: ["$stock", "$purchasePrice"]
                }
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$value"
                }
            }
        }
    ]);

    return {
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalPurchases,
        totalSales,
        totalStockValue: stockValue[0]?.total || 0,
        totalRevenue: salesRevenue[0]?.total || 0,
        totalPurchaseCost: purchaseCost[0]?.total || 0,
    };
};

const getLowStockProducts = async () => {
    const products = await Product.find({
        $expr: {
            $lte: ["$stock", "$minimumStock"]
        }
    }).select("name sku stock minimumStock");

    return products;
};

const getRecentPurchases = async () => {
    const purchases = await Purchase.find()
        .populate("product", "name sku")
        .populate("supplier", "name companyName")
        .sort({ createdAt: -1 })
        .limit(5)

    return purchases;
};

const getRecentSales = async () => {
    const sales = await Sale.find()
        .populate("product", "name sku")
        .sort({ createdAt: -1 })
        .limit(5)

    return sales;
};

module.exports = {
    getDashboardSummary,
    getLowStockProducts,
    getRecentPurchases,
    getRecentSales,
};