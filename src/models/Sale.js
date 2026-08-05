const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        // Product reference
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        // Customer reference
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true,
        },

        // Quantity sold
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        // Selling price per unit
        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        // Total sale amount
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        // Customer name snapshot
        // This will be automatically populated
        // from the Customer document by saleService
        customerName: {
            type: String,
            trim: true,
        },

        // Sale date
        saleDate: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Sale", saleSchema);