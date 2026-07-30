const express = require("express");
const supplierController = require("../controllers/supplierController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, supplierController.createSupplier);
router.get("/", protect, supplierController.getAllSuppliers);
router.get("/:id", protect, supplierController.getSupplierById);
router.put("/:id", protect, supplierController.updateSupplier);
router.delete("/:id", protect, supplierController.deleteSupplier);
module.exports = router;