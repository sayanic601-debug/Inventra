const mongoose = require("mongoose");

const inventoryTransactionSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        type: {
            type: String,
            enum: ["STOCK_IN", "STOCK_OUT"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        referenceType: {
            type: String,
            enum: ["PURCHASE", "SALE"],
            required: true,
        },

        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        note: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "InventoryTransaction",
    inventoryTransactionSchema
);