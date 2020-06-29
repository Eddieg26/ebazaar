const Product = require('../models/Product.model');
const mongoose = require('mongoose');

const getById = async productId => {
    return Product.findById(productId);
}

const getByIdMany = async productIds => {
    let arr = productIds.map((value) => new mongoose.Types.ObjectId(value));
    console.log(arr);

    return await Product.find({ _id: { $in: arr } });
}

const getAll = async () => {
    return await Product.find({});
}

const getByFilter = async (filterOptions) => {
    const { minPrice, rating } = filterOptions;
    let { maxPrice, categoryIds, brandIds } = filterOptions;

    let filter = {};

    if (maxPrice !== undefined && maxPrice === 0)
        maxPrice = Number.MAX_SAFE_INTEGER;

    if (minPrice !== undefined && maxPrice !== undefined)
        filter.price = { $gte: minPrice, $lte: maxPrice };

    if (brandIds && brandIds.length > 0)
        filter.brandId = { $in: brandIds }

    if (categoryIds && categoryIds.length > 0)
        filter.categoryId = { $in: categoryIds }

    if (rating !== undefined)
        filter.rating = { $gte: rating.toFixed(), $lte: rating.rating() + 1 };

    return await Product.find(filter);
}

const create = async (productInfo) => {
    return await new Product(productInfo).save();
}

const createMany = async (products) => {
    return await Product.insertMany(products);
}

module.exports = {
    getById,
    getByIdMany,
    getAll,
    getByFilter,
    getByIdMany,
    create,
    createMany
}