const express = require("express");

const customerController = require("../controllers/customerController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Electronics customer management APIs
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags:
 *       - Customers
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
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Kolkata, West Bengal
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
    "/",
    protect,authorize("admin", "manager", "staff"),
    customerController.createCustomer
);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Number of customers per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search customers
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/",
    protect,authorize("admin", "manager", "staff"),
    customerController.getAllCustomers
);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get(
    "/:id",
    protect,authorize("admin", "manager", "staff"),
    customerController.getCustomerById
);

/**
 * @swagger
 * /customers/{id}/purchase-history:
 *   get:
 *     summary: Get customer purchase history
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer purchase history retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get(
    "/:id/purchase-history",
    protect,authorize("admin", "manager", "staff"),
    customerController.getCustomerPurchaseHistory
);

/**
 * @swagger
 * /customers/{id}/summary:
 *   get:
 *     summary: Get customer summary
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer summary retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.get(
    "/:id/summary",
    protect,authorize("admin", "manager", "staff"),
    customerController.getCustomerSummary
);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe Updated
 *               email:
 *                 type: string
 *                 example: johnupdated@example.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Howrah, West Bengal
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.put(
    "/:id",
    protect,authorize("admin", "manager", "staff"),
    customerController.updateCustomer
);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer
 *     tags:
 *       - Customers
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Server error
 */
router.delete(
    "/:id",
    protect,authorize("admin"),
    customerController.deleteCustomer
);

module.exports = router;