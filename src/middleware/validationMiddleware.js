const { body, param, validationResult } = require("express-validator");

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    next();
};

// Product Validation
const validateCreateProduct = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required"),

    body("sku")
        .notEmpty()
        .withMessage("SKU is required"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

    body("supplier")
        .notEmpty()
        .withMessage("Supplier is required"),

    body("purchasePrice")
        .isFloat({ min: 0 })
        .withMessage("Purchase price must be greater than or equal to 0"),

    body("sellingPrice")
        .isFloat({ min: 0 })
        .withMessage("Selling price must be greater than or equal to 0"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a positive integer"),

    body("minimumStock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Minimum stock must be a positive integer"),

    handleValidationErrors,
];

module.exports = {
    validateCreateProduct,
};