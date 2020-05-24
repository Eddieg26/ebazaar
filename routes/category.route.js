const express = require('express');
const asynchandler = require('express-async-handler');
const categoryController = require('../controllers/category.controller');

const router = express.Router();
module.exports = router;

const getAll = async (req, res) => {
    const categories = await categoryController.getAll();
    return res.json(categories);
}

router.route('/').get(asynchandler(getAll));
