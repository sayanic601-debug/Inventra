const Product = require("../models/Product");
const Category = require("../models/Category");
const Supplier = require("../models/Supplier");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");
const Customer = require("../models/Customer");

// Get Dashboard Summary
const getDashboardSummary = async () => {
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const totalPurchases = await Purchase.countDocuments();

    const totalSales = await Sale.countDocuments();

    // Calculate total sales revenue
    const salesRevenue = await Sale.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);

    // Calculate total purchase cost
    const purchaseCost = await Purchase.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);

    // Calculate total stock value
    const stockValue = await Product.aggregate([
        {
            $project: {
                value: {
                    $multiply: [
                        "$stock",
                        "$purchasePrice",
                    ],
                },
            },
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$value",
                },
            },
        },
    ]);

    // Count low stock products
    const lowStockCount = await Product.countDocuments({
        $expr: {
            $lte: [
                "$stock",
                "$minimumStock",
            ],
        },
    });

    return {
        totalProducts,
        totalCategories,
        totalSuppliers,
        totalPurchases,
        totalSales,

        totalRevenue:
            salesRevenue[0]?.total || 0,

        totalPurchaseCost:
            purchaseCost[0]?.total || 0,

        totalStockValue:
            stockValue[0]?.total || 0,

        lowStockCount,
    };
};


// Get Low Stock Products
const getLowStockProducts = async () => {
    const products = await Product.find({
        $expr: {
            $lte: [
                "$stock",
                "$minimumStock",
            ],
        },
    }).select(
        "name sku stock minimumStock"
    );

    return products;
};


// Get Recent Purchases
const getRecentPurchases = async () => {
    const purchases = await Purchase.find()
        .populate(
            "product",
            "name sku"
        )
        .populate(
            "supplier",
            "name companyName"
        )
        .sort({
            createdAt: -1,
        })
        .limit(5);

    return purchases;
};


// Get Recent Sales
const getRecentSales = async () => {
    const sales = await Sale.find()
        .populate(
            "product",
            "name sku"
        )
        .populate(
            "customer",
            "name email phone"
        )
        .sort({
            createdAt: -1,
        })
        .limit(5);

    return sales;
};

const getTopSellingProducts = async () => {
    const products = await Sale.aggregate([
        {
            $group: {
                _id: "$product",
                totalQuantitySold: {
                    $sum: "$quantity",
                },
                totalRevenue: {
                    $sum: "$totalAmount",
                },
            },
        },
        {
            $sort: {
                totalQuantitySold: -1,
            },
        },
        {
            $limit: 5,
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $project: {
                _id: 0,
                productId: "$product._id",
                name: "$product.name",
                sku: "$product.sku",
                totalQuantitySold: 1,
                totalRevenue: 1,
            },
        },
    ]);

    return products;
};

const getRecentCustomers = async () => {
    const customers = await Customer.find()
        .select("name email phone createdAt")
        .sort({ createdAt: -1 })
        .limit(5);

    return customers;
};

module.exports = {
    getDashboardSummary,
    getLowStockProducts,
    getRecentPurchases,
    getRecentSales,
    getTopSellingProducts,
    getRecentCustomers
};