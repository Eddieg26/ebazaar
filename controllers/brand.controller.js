const Brand = require('../models/Brand.model');

const getAll = async () => {
    return await Brand.find({});
}

module.exports = {
    getAll
}