import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { deliveryOptionService } from '../../services/deliveryOption.service'

import { Paper, List, ListItem, ListItemText, Typography, Box } from '@material-ui/core';

import { styles } from './order.styles';

const ProductElement = ({ product, classes }) => {
    return (
        <ListItem key={product._id}>
            <div className={classes.productView}>
                <img className={classes.productImage} src="assets\product-images\apple-audio-01.jpg" alt="" />
                <ListItemText primary={product.name} />
                <div>
                    <ListItemText primary={`$${(product.price / 100).toFixed(2)}`} />
                    <ListItemText primary={`Qty: ${product.amount}`} />
                </div>
            </div>
        </ListItem>
    )
}

const OrderPage = ({ currentOrder }) => {
    const classes = styles();
    const [deliveryOption, setDeliveryOption] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);

    useEffect(() => {
        if (!currentOrder) {
            return;
        }

        const fetchDeliveryOption = async (id) => {
            const deliveryOptions = await deliveryOptionService.getAll();
            const option = deliveryOptions.find(_option => _option._id === id);
            setDeliveryOption(option);
        }

        fetchDeliveryOption(currentOrder.deliveryOption);

    }, [currentOrder]);

    useEffect(() => {
        if (!deliveryOption) {
            return;
        }

        const price = currentOrder.products.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price * currentValue.amount;
        }, 0);

        const tax = (price + deliveryOption.price) * 0.07;

        setSubTotal(price);
        setTax(tax);

    }, [deliveryOption]);

    const getDateString = date => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        return new Date(date).toLocaleDateString('en-US', options);
    }

    return (
        <div className={classes.main}>
            <Paper classes={{ root: classes.productsView }} elevation={2}>
                <Typography variant="h5">
                    <Box m={1}>Products</Box>
                </Typography>

                <List className={classes.list} dense>
                    {currentOrder && currentOrder.products.map(product => (<ProductElement product={product} classes={classes} />))}
                </List>
            </Paper>

            <Paper classes={{ root: classes.shippingDetailsView }}>
                <Typography variant="h5">
                    <Box m={1}>Shipping details</Box>
                </Typography>

                <div className={classes.shippingDetails}>
                    <div className={classes.m1}>
                        <Typography variant="subtitle2">Shipping address</Typography>
                        <Typography variant="body2">{currentOrder.shippingAddress.name}</Typography>
                        <Typography variant="body2">{currentOrder.shippingAddress.street}</Typography>
                        <Typography variant="body2">{`${currentOrder.shippingAddress.city} ${currentOrder.shippingAddress.state}, ${currentOrder.shippingAddress.zipcode}`}</Typography>
                    </div>

                    <div className={classes.m1}>
                        <Typography variant="subtitle2">Billing address</Typography>
                        <Typography variant="body2">{currentOrder.billingAddress.name}</Typography>
                        <Typography variant="body2">{currentOrder.billingAddress.street}</Typography>
                        <Typography variant="body2">{`${currentOrder.billingAddress.city} ${currentOrder.billingAddress.state}, ${currentOrder.billingAddress.zipcode}`}</Typography>
                    </div>
                </div>
            </Paper>

            <Paper classes={{ root: classes.formWidth }}>
                <Typography variant="h5">
                    <Box m={1}>Receipt</Box>
                </Typography>

                <Typography className={`${classes.mt1}, ${classes.ml2}`} variant="subtitle2">
                    <Box>Order placed:</Box>
                </Typography>

                <Typography className={`${classes.ml2} ${classes.mb1}`} variant="h6">
                    <Box fontWeight="fontWeightLight">{getDateString(currentOrder.createdAt)}</Box>
                </Typography>

                <div className={classes.totalsView}>
                    <div>
                        <span>Subtotal:</span>
                        <span className={classes.floatRight}>${subTotal.toFixed(2)}</span>
                    </div>
                    <div>
                        <span>Tax:</span>
                        <span className={classes.floatRight}>${tax.toFixed(2)}</span>
                    </div>
                    {deliveryOption && <div>
                        <span>Shipping:</span>
                        <span className={classes.floatRight}>${deliveryOption.price.toFixed(2)}</span>
                    </div>}
                    <div>
                        <span>Total:</span>
                        <span className={classes.floatRight}>${currentOrder.totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <div className={classes.clearFloat} />

            </Paper>
        </div>
    )
}

const mapStateToProps = state => {
    const { order } = state;

    return {
        currentOrder: order.currentOrder
    }
}

export default connect(mapStateToProps)(OrderPage);
