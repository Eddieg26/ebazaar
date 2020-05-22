const express = require('express');
const userRoutes = require('./user.route');
const productRoutes = require('./product.route');
const brandsRoutes = require('./brands.route');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/brands', brandsRoutes);

module.exports = router;