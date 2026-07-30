const Product = require("../models/Product");

const createProduct = async (productData) => {
    try {
        const existingProduct = await Product.findOne({sku: productData.sku});
        if(existingProduct){
            throw new Error("Product already exists");
        }
        const product = await Product.create(productData);

        return product;
    } catch (error) {
        throw error;
    }
};

const getAllProducts = async (query = {}) => {
    try {
        const filter = {};

        // Search by product name
        if (query.search) {
            filter.name = {
                $regex: query.search,
                $options: "i",
            };
        }

        // Filter by category name
        if (query.category) {
            const Category = require("../models/Category");

            const category = await Category.findOne({
                name: {
                    $regex: query.category,
                    $options: "i",
                },
            });

            if (!category) {
                return {
                    products: [],
                    totalProducts: 0,
                    currentPage: Number(query.page) || 1,
                    totalPages: 0,
                };
            }

            filter.category = category._id;
        }

        // Sorting
        let sortOption = {};

        if (query.sort === "price_asc") {
            sortOption.sellingPrice = 1;
        } else if (query.sort === "price_desc") {
            sortOption.sellingPrice = -1;
        } else if (query.sort === "newest") {
            sortOption.createdAt = -1;
        } else if (query.sort === "oldest") {
            sortOption.createdAt = 1;
        }
        

        // Pagination
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.max(Number(query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        // Get total number of matching products
        const totalProducts = await Product.countDocuments(filter);

        // Get products for current page
        const products = await Product.find(filter)
            .populate("category", "name description")
            .populate("supplier", "name email phone companyName")
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalProducts / limit);

        return {
            products,
            totalProducts,
            currentPage: page,
            totalPages,
        };
    } catch (error) {
        throw error;
    }
};
const getProductById = async (id) => {
    const product = await Product.findById(id)
    .populate("category", "name description")
    .populate("supplier", "name email phone companyName");

    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

const updateProduct = async (id, productData) => {
    const product = await Product.findByIdAndUpdate(
        id, 
        productData,
        {
            new: true,
            runValidators: true,
        }
    );


    if (!product) {
        throw new Error("Product not found");
    }
    
    return product;
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        throw new Error("Product not found");
    }
    
    return product;
};


module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };