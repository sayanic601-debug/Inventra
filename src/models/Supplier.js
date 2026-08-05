const mongoose = require("mongoose");

// =====================================================
// Supplier Schema
// =====================================================

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Supplier email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Supplier phone number is required"],
      trim: true,
      minlength: 10,
      maxlength: 15,
    },

    address: {
      type: String,
      required: [true, "Supplier address is required"],
      trim: true,
      maxlength: 500,
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// =====================================================
// Export Model
// =====================================================

module.exports = mongoose.model("Supplier", supplierSchema);