const Category = require("../models/Category");

// =====================================================
// CREATE CATEGORY
// =====================================================

const createCategory = async (categoryData) => {
    const existingCategory = await Category.findOne({
        name: categoryData.name,
    });

    if (existingCategory) {
        throw new Error("Category already exists");
    }

    const category = await Category.create(categoryData);

    return category;
};

// =====================================================
// GET ALL CATEGORIES
// =====================================================

const getAllCategories = async () => {
    const categories = await Category.find().sort({
        createdAt: -1,
    });

    return categories;
};

// =====================================================
// GET CATEGORY BY ID
// =====================================================

const getCategoryById = async (id) => {
    const category = await Category.findById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

// =====================================================
// UPDATE CATEGORY
// =====================================================

const updateCategory = async (id, categoryData) => {

    if (categoryData.name) {

        const existingCategory = await Category.findOne({
            name: categoryData.name,
            _id: { $ne: id },
        });

        if (existingCategory) {
            throw new Error("Category already exists");
        }
    }

    const category = await Category.findByIdAndUpdate(
        id,
        categoryData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

// =====================================================
// DELETE CATEGORY
// =====================================================

const deleteCategory = async (id) => {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};