const express = require('express');
const asynchandler = require('express-async-handler');
const productController = require('../controllers/product.controller');

const router = express.Router();
module.exports = router;

const getById = async (req, res) => {
    const productId = req.params.productId;
    const product = await productController.getById(productId);
    return res.json(product);
}

const getByIdMany = async (req, res) => {
    const productIds = JSON.parse(req.params.productIds);
    const products = await productController.getByIdMany(productIds);
    return res.json(products);
}

const getAll = async (req, res) => {
    const products = await productController.getAll();
    return res.json(products);
}

const getByFilter = async (req, res) => {
    const filter = req.body;
    const products = await productController.getByFilter(filter);
    return res.json(products);
}

const create = async (req, res) => {
    const productInfo = req.body;
    const product = await productController.create(productInfo);
    return res.json(product);
}

router.route('/:productId').get(asynchandler(getById));
router.route('/many/:productIds').get(asynchandler(getByIdMany));
router.route('/').get(asynchandler(getAll));
router.route('/filter').post(asynchandler(getByFilter));
router.route('/new').post(asynchandler(create));



