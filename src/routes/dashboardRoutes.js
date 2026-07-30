const express = require("express");
const dashboardController = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", protect, dashboardController.getDashboardSummary);
router.get("/low-stock", protect, dashboardController.getLowStockProducts);
router.get("/recent-purchases", protect, dashboardController.getRecentPurchases);
router.get("/recent-sales", protect, dashboardController.getRecentSales);

module.exports = router;