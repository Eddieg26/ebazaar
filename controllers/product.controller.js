const Product = require('../models/Product.model');
const mongoose = require('mongoose');

const getById = async productId => {
    return Product.findById(productId);
}

const getByIdMany = async productIds => {
    let arr = productIds.map(id => new mongoose.Types.ObjectId(id));

    return await Product.find().where('_id').in(arr).exec();
}

const getAll = async () => {
    return await Product.find({});
}

const getByFilter = async (filter) => {
    const { minPrice, maxPrice, brandId, categoryId, rating } = filter;

    let filterObject = {};

    if (maxPrice !== undefined && maxPrice === 0)
        maxPrice = Number.MAX_SAFE_INTEGER;

    if (minPrice !== undefined && maxPrice !== undefined)
        filterObject.price = { $gte: minPrice, $lte: maxPrice };
    
    if (brandId !== undefined)
        filterObject.brandId = brandId;
    
    if (categoryId !== undefined)
        filterObject.categoryId = categoryId;
    
    if (rating !== undefined)
        filterObject.rating = { $gte: rating.toFixed(), $lte: rating.rating() + 1 };
    
    console.log(filterObject);
    
    return await Product.find(filterObject);
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