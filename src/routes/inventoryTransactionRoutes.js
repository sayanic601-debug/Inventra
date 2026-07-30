const express = require("express");
const inventoryTransactionController = require("../controllers/inventoryTransactionController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Product inventory summary - specific route first
router.get(
    "/product/:productId/summary",
    protect,
    inventoryTransactionController.getProductInventorySummary
);

// Product-wise inventory transactions
router.get(
    "/product/:productId",
    protect,
    inventoryTransactionController.getTransactionsByProduct
);

// All inventory transactions
router.get(
    "/",
    protect,
    inventoryTransactionController.getAllTransactions
);

module.exports = router;