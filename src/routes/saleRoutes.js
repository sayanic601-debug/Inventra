const express = require("express");
const saleController = require("../controllers/saleController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, saleController.createSale);
router.get("/", protect, saleController.getAllSales);
router.get("/:id", protect, saleController.getSaleBYId);
router.put("/:id", protect, saleController.updateSale);
router.delete("/:id", protect, saleController.deleteSale);

module.exports = router;