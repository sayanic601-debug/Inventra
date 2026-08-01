const express = require("express");

const customerController = require("../controllers/customerController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    customerController.createCustomer
);

router.get(
    "/",
    protect,
    customerController.getAllCustomers
);

router.get(
    "/:id",
    protect,
    customerController.getCustomerById
);

router.get(
    "/:id/purchase-history",
    protect,
    customerController.getCustomerPurchaseHistory
);

router.get(
    "/:id/summary",
    protect,
    customerController.getCustomerSummary
);

router.put(
    "/:id",
    protect,
    customerController.updateCustomer
);



router.delete(
    "/:id",
    protect,
    customerController.deleteCustomer
);



module.exports = router;