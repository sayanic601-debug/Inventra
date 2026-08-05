const express = require("express");
const inventoryTransactionController = require("../controllers/inventoryTransactionController");
const { protect,authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Inventory Transactions
 *   description: Electronics inventory stock movement and transaction APIs
 */

/**
 * @swagger
 * /inventory-transactions/product/{productId}/summary:
 *   get:
 *     summary: Get product inventory summary
 *     tags:
 *       - Inventory Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Product inventory summary retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get(
    "/product/:productId/summary",
    protect,authorize("admin","manager","staff"),
    inventoryTransactionController.getProductInventorySummary
);

/**
 * @swagger
 * /inventory-transactions/product/{productId}:
 *   get:
 *     summary: Get inventory transactions for a specific product
 *     tags:
 *       - Inventory Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Product inventory transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get(
    "/product/:productId",
    protect,authorize("admin","manager","staff"),
    inventoryTransactionController.getTransactionsByProduct
);

/**
 * @swagger
 * /inventory-transactions:
 *   get:
 *     summary: Get all inventory transactions
 *     tags:
 *       - Inventory Transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All inventory transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/",
    protect,authorize("admin","manager","staff"),
    inventoryTransactionController.getAllTransactions
);

module.exports = router;