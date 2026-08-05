const express = require("express");
const authController = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and profile APIs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Server error
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful and JWT token generated
 *       400:
 *         description: Invalid email or password
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get logged-in user profile
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Authentication required or invalid token
 *       500:
 *         description: Server error
 */
router.get(
    "/profile",
    protect,
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user: req.user
        });
    }
);

module.exports = router;