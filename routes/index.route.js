const express = require('express');
const userRoutes = require('./user.route');
const productRoutes = require('./product.route');
const brandRoutes = require('./brand.route');
const categoryRoutes = require('./category.route');
const deliveryTypeRoutes = require('./deliveryType.route');
const orderRoutes = require('./order.route');
const stripeRoutes = require('./stripe.route');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/brands', brandRoutes);
router.use('/category', categoryRoutes);
router.use('/delivery', deliveryTypeRoutes);
router.use('/order', orderRoutes);
router.use('/stripe', stripeRoutes);

module.exports = router;