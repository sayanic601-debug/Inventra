const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Electronics inventory purchase management APIs
 */

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Create a new purchase
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - supplier
 *               - quantity
 *               - purchasePrice
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *                 example: 507f1f77bcf86cd799439011
 *               supplier:
 *                 type: string
 *                 description: Supplier ID
 *                 example: 507f1f77bcf86cd799439012
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 example: 10
 *               purchasePrice:
 *                 type: number
 *                 minimum: 0
 *                 example: 65000
 *     responses:
 *       201:
 *         description: Purchase created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product or supplier not found
 *       500:
 *         description: Server error
 */
router.post("/", protect, purchaseController.createPurchase);

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Get all purchases
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search purchases by product name or SKU
 *         example: Samsung
 *
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *         description: Filter purchases by product ID
 *         example: 507f1f77bcf86cd799439011
 *
 *       - in: query
 *         name: supplier
 *         schema:
 *           type: string
 *         description: Filter purchases by supplier ID
 *         example: 507f1f77bcf86cd799439012
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - Completed
 *             - Pending
 *             - Cancelled
 *         description: Filter purchases by purchase status
 *         example: Completed
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter purchases from this date
 *         example: 2026-01-01
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter purchases up to this date
 *         example: 2026-08-02
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - newest
 *             - oldest
 *             - price_asc
 *             - price_desc
 *             - amount_asc
 *             - amount_desc
 *         description: Sort purchase results
 *         example: newest
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of purchases per page
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: Purchases retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", protect, purchaseController.getAllPurchases);

/**
 * @swagger
 * /purchases/{id}:
 *   get:
 *     summary: Get purchase by ID
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Purchase ID
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Purchase retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Purchase not found
 *       500:
 *         description: Server error
 */
router.get("/:id", protect, purchaseController.getPurchaseById);

/**
 * @swagger
 * /purchases/{id}:
 *   put:
 *     summary: Update a purchase
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Purchase ID
 *         example: 507f1f77bcf86cd799439013
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 example: 15
 *               purchasePrice:
 *                 type: number
 *                 minimum: 0
 *                 example: 63000
 *     responses:
 *       200:
 *         description: Purchase updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Purchase or product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, purchaseController.updatePurchase);

/**
 * @swagger
 * /purchases/{id}:
 *   delete:
 *     summary: Delete a purchase
 *     tags:
 *       - Purchases
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Purchase ID
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Purchase deleted successfully and stock reversed
 *       400:
 *         description: Cannot delete purchase because current stock is less than purchased quantity
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Purchase or product not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, purchaseController.deletePurchase);

module.exports = router;