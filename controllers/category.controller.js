const Category = require('../models/Category.model');

const getAll = async () => {
    return await Category.find({});
}

module.exports = {
    getAll
}