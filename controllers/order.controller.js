const Order = require('../models/Order.model');

const getById = async (id) => {
    return Order.findById(id);
}

const getByCustomer = async (customerId) => {
    return Order.find({ customerId });
}

const create = async (orderInfo) => {
    return await new Order(orderInfo).save();
}

// auth check needed here
const update = async (orderId, updatedInfo) => {
    return await Order.updateOne({ _id: orderId }, { ...updatedInfo });
}

const deleteOrder = async (orderId) => {
    return Order.findByIdAndDelete(orderId);
}

module.exports = {
    getById,
    getByCustomer,
    create,
    update,
    deleteOrder
}