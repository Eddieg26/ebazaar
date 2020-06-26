const express = require('express');
const asynchandler = require('express-async-handler');
const orderController = require('../controllers/order.controller');

const router = express.Router();
module.exports = router;

const getByCustomer = async (req, res) => {
    const customerId = req.params.customerId;
    const orders = await orderController.getByCustomer(customerId);
    return res.json(orders);
}

const create = async (req, res) => {
    const orderInfo = req.body;
    const order = await orderController.create(orderInfo);
    return res.json(order);
}

const update = async (req, res) => {
    const orderId = req.params.orderId;
    const updatedInfo = req.body;
    await orderController.update(orderId, updatedInfo);

    const order = await orderController.getById(orderId);
    return res.json(order);
}

router.route('/:customerId').get(asynchandler(getByCustomer));
router.route('/create').post(asynchandler(create));
router.route('/update/:orderId').patch(asynchandler(update));