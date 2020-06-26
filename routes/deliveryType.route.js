const express = require('express');
const asynchandler = require('express-async-handler');
const deliveryTypeController = require('../controllers/deliveryType.controller');

const router = express.Router();
module.exports = router;

const getAll = async (req, res) => {
    const deliveryTypes = await deliveryTypeController.getAll();
    return res.json(deliveryTypes);
}

router.route('/').get(asynchandler(getAll));