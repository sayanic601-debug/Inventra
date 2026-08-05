const express = require("express");
const productController = require("../controllers/productController");
const { protect, authorize } = require("../middleware/authMiddleware");

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
 *               - stock
 *               - minimumStock
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
 *                 example: 55000
 *               sellingPrice:
 *                 type: number
 *                 example: 65000
 *               stock:
 *                 type: number
 *                 example: 20
 *               minimumStock:
 *                 type: number
 *                 example: 5
 *               status:
 *                 type: string
 *                 enum:
 *                   - Active
 *                   - Inactive
 *                 example: Active
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation error or product already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
    "/",
    protect,
    authorize("admin", "manager"),
    productController.createProduct
);

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
 *         description: Search by product name or SKU
 *         example: Samsung
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category name
 *         example: Smartphones
 *       - in: query
 *         name: supplier
 *         schema:
 *           type: string
 *         description: Filter by supplier name
 *         example: ABC Electronics
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
 *         example: price_asc
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of products per page
 *         example: 10
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/",
    protect,
    authorize("admin", "manager", "staff"),
    productController.getAllProducts
);

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
 *         example: 507f1f77bcf86cd799439011
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
router.get(
    "/:id",
    protect,
    authorize("admin", "manager", "staff"),
    productController.getProductById
);

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
 *         example: 507f1f77bcf86cd799439011
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
 *               sku:
 *                 type: string
 *                 example: SAM-S24-U-001
 *               category:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               supplier:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439012
 *               purchasePrice:
 *                 type: number
 *                 example: 60000
 *               sellingPrice:
 *                 type: number
 *                 example: 70000
 *               stock:
 *                 type: number
 *                 example: 25
 *               minimumStock:
 *                 type: number
 *                 example: 5
 *               status:
 *                 type: string
 *                 enum:
 *                   - Active
 *                   - Inactive
 *                 example: Active
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put(
    "/:id",
    protect,
    authorize("admin", "manager"),
    productController.updateProduct
);

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
 *         example: 507f1f77bcf86cd799439011
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
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    productController.deleteProduct
);

module.exports = router;