const express = require("express");
const saleController = require("../controllers/saleController");
const { protect, authorize }  = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Electronics sales and inventory management APIs
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags:
 *       - Sales
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
 *               - customer
 *               - quantity
 *               - sellingPrice
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *                 example: 507f1f77bcf86cd799439011
 *               customer:
 *                 type: string
 *                 description: Customer ID
 *                 example: 507f1f77bcf86cd799439012
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 example: 2
 *               sellingPrice:
 *                 type: number
 *                 minimum: 0
 *                 example: 74999
 *               customerName:
 *                 type: string
 *                 description: Optional customer name
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: Sale created successfully
 *       400:
 *         description: Validation error or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product or customer not found
 *       500:
 *         description: Server error
 */
router.post("/", protect,authorize("admin","manager","staff"), saleController.createSale);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: customer
 *         schema:
 *           type: string
 *         description: Filter sales by customer ID
 *         example: 507f1f77bcf86cd799439012
 *
 *       - in: query
 *         name: product
 *         schema:
 *           type: string
 *         description: Filter sales by product ID
 *         example: 507f1f77bcf86cd799439011
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter sales from this date
 *         example: 2026-01-01
 *
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter sales up to this date
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
 *         description: Sort sales
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
 *         description: Number of sales per page
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: Sales retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", protect,authorize("admin","manager","staff"), saleController.getAllSales);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Sale retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Server error
 */
router.get("/:id", protect,authorize("admin","manager","staff"), saleController.getSaleBYId);

/**
 * @swagger
 * /sales/{id}:
 *   put:
 *     summary: Update a sale
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *         example: 507f1f77bcf86cd799439013
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer:
 *                 type: string
 *                 description: New customer ID
 *                 example: 507f1f77bcf86cd799439014
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 example: 3
 *               sellingPrice:
 *                 type: number
 *                 minimum: 0
 *                 example: 72999
 *               customerName:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Sale updated successfully
 *       400:
 *         description: Validation error or insufficient stock
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sale, product, or customer not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect,authorize("admin","manager"), saleController.updateSale);

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Delete a sale
 *     tags:
 *       - Sales
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *         example: 507f1f77bcf86cd799439013
 *     responses:
 *       200:
 *         description: Sale deleted successfully and product stock restored
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Sale or product not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect,authorize("admin"), saleController.deleteSale);

module.exports = router;