const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, purchaseController.createPurchase);
router.get("/", protect, purchaseController.getAllPurchases);
router.get("/:id", protect, purchaseController.getPurchaseById);
router.put("/:id", protect, purchaseController.updatePurchase);
router.delete("/:id", protect, purchaseController.deletePurchase);

module.exports = router;