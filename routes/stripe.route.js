const express = require('express');
const asynchandler = require('express-async-handler');
const productController = require('../controllers/product.controller');
const stripe = require('stripe')('sk_test_hf2EZWXljfwdRLX0UxxuMjbx', { apiVersion: '' });
require('dotenv').config();

const router = express.Router();
module.exports = router;

const createCharge = async (req, res) => {
    const { id, products } = req.body;

    const productList = await productController.getByIdMany(products);
    let total = 0;

    productList.forEach(product => {
        const p = products.find(p => p.id === product._id.toString());
        const amount = p.amount;
        total += (product.price) * amount;
    });

    try {
        const payment = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            payment_method: id,
            confirm: true
        });

        return res.status(200).json({ code: 0, message: "Payment was successful" });
    } catch (error) {
        return res.status(200).json({ code: 1, message: "Payment was unsuccessful." });
    }

}

const test = (req, res) => {
    return res.json({ message: 'success' });
}

router.route('/charge').post(asynchandler(createCharge));
router.route('/test').get(test);
