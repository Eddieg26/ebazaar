const DeliveryType = require('../models/DeliveryType.model');

const getAll = async () => {
    return await DeliveryType.find({});
}

module.exports = {
    getAll
}