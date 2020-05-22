const express = require('express');
const asynchandler = require('express-async-handler');
const brandController = require('../controllers/brand.controller');

const router = express.Router();
module.exports = router;

const getAll = async (req, res) => {
    const brands = await brandController.getAll();
    return res.json(brands);
}

router.route('/').get(asynchandler(getAll));
