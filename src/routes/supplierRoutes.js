const express = require("express");
const supplierController = require("../controllers/supplierController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Electronics supplier management APIs
 */

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags:
 *       - Suppliers
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: ABC Electronics
 *               email:
 *                 type: string
 *                 example: supplier@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               companyName:
 *                 type: string
 *                 example: ABC Electronics Pvt Ltd
 *               address:
 *                 type: string
 *                 example: Kolkata, West Bengal
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       400:
 *         description: Validation error or supplier already exists
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/", protect,authorize("admin","manager", "staff"), supplierController.createSupplier);  

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags:
 *       - Suppliers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Suppliers retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", protect,authorize("admin","manager","staff"), supplierController.getAllSuppliers);

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags:
 *       - Suppliers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.get("/:id", protect,authorize("admin","manager","staff"), supplierController.getSupplierById);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update a supplier
 *     tags:
 *       - Suppliers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: ABC Electronics Updated
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               companyName:
 *                 type: string
 *                 example: ABC Electronics Pvt Ltd
 *               address:
 *                 type: string
 *                 example: Kolkata, West Bengal
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, authorize("admin","manager"), supplierController.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier
 *     tags:
 *       - Suppliers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, authorize("admin"), supplierController.deleteSupplier);

module.exports = router;