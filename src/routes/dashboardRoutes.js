const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const { protect,authorize } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics and business overview APIs
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/summary",
    protect,authorize("admin","manager","staff"),
    dashboardController.getDashboardSummary
);

/**
 * @swagger
 * /dashboard/low-stock:
 *   get:
 *     summary: Get low-stock products
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Low-stock products retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/low-stock",
    protect,authorize("admin","manager","staff"),
    dashboardController.getLowStockProducts
);

/**
 * @swagger
 * /dashboard/recent-purchases:
 *   get:
 *     summary: Get recent purchases
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent purchases retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/recent-purchases",
    protect,authorize("admin","manager","staff"),
    dashboardController.getRecentPurchases
);

/**
 * @swagger
 * /dashboard/recent-sales:
 *   get:
 *     summary: Get recent sales
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent sales retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/recent-sales",
    protect,authorize("admin","manager","staff"),
    dashboardController.getRecentSales
);

/**
 * @swagger
 * /dashboard/top-selling-products:
 *   get:
 *     summary: Get top-selling products
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top-selling products retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/top-selling-products",
    protect,authorize("admin","manager","staff"),
    dashboardController.getTopSellingProducts
);

/**
 * @swagger
 * /dashboard/recent-customers:
 *   get:
 *     summary: Get recently added customers
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent customers retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    "/recent-customers",
    protect,authorize("admin","manager","staff"),
    dashboardController.getRecentCustomers
);

module.exports = router;