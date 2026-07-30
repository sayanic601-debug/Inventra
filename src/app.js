const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const saleRoutes = require("./routes/saleRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const inventoryTransactionRoutes = require("./routes/inventoryTransactionRoutes");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Inventra API",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/v1/purchases", purchaseRoutes);
app.use("/api/v1/sales", saleRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/inventory-transactions", inventoryTransactionRoutes);
app.use("/api/v1/customers", customerRoutes);
// Global Error Handler for catching JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format. Please ensure all keys and string values are enclosed in double quotes, and there are no trailing commas.",
      error: err.message
    });
  }
  next(err);
});

module.exports = app;