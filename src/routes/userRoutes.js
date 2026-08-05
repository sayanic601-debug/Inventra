const express = require("express");
const userController = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs - Admin only
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all registered users. This endpoint is accessible only to administrators.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Authentication required or invalid token
 *       403:
 *         description: Access denied. Admin role required
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  protect,
  authorize("admin"),
  userController.getAllUsers
);

/**
 * @swagger
 * /users/{id}/role:
 *   put:
 *     summary: Update user role
 *     description: Update the role of an existing user. This endpoint is accessible only to administrators.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum:
 *                   - admin
 *                   - manager
 *                   - staff
 *                 example: manager
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Invalid role or validation error
 *       401:
 *         description: Authentication required or invalid token
 *       403:
 *         description: Access denied. Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id/role",
  protect,
  authorize("admin"),
  userController.updateUserRole
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user. This endpoint is accessible only to administrators.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Authentication required or invalid token
 *       403:
 *         description: Access denied. Admin role required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  userController.deleteUser
);

module.exports = router;