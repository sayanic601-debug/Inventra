const express = require("express");
const productController = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Electronics product management APIs
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sku
 *               - category
 *               - supplier
 *               - purchasePrice
 *               - sellingPrice
 *             properties:
 *               name:
 *                 type: string
 *                 example: Samsung Galaxy S24
 *               sku:
 *                 type: string
 *                 example: SAM-S24-001
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               supplier:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               purchasePrice:
 *                 type: number
 *                 example: 65000
 *               sellingPrice:
 *                 type: number
 *                 example: 74999
 *               stock:
 *                 type: number
 *                 example: 10
 *               minimumStock:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Product already exists or validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", protect, productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category name
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - price_asc
 *             - price_desc
 *             - newest
 *             - oldest
 *         description: Sort products
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", protect, productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get("/:id", protect, productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Samsung Galaxy S24 Ultra
 *               sellingPrice:
 *                 type: number
 *                 example: 79999
 *               minimumStock:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, productController.deleteProduct);

module.exports = router;