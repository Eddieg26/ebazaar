import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { deliveryOptionService } from '../../services/deliveryOption.service'
import { productService } from '../../services/product.service';

import { Paper, List, ListItem, ListItemText, Typography, Box, Grid } from '@material-ui/core';

import { styles } from './order.styles';

const ProductElement = ({ product, classes, imgUrl }) => {
    return (
        <ListItem key={product._id}>
            <div className={classes.productView}>
                <img className={classes.productImage} src={imgUrl} alt="" />
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
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!currentOrder) {
            return;
        }

        const fetchDeliveryOption = async (id) => {
            const deliveryOptions = await deliveryOptionService.getAll();
            const option = deliveryOptions.find(_option => _option._id === id);
            setDeliveryOption(option);
        }

        const fetchProducts = async (order) => {
            const proudctIds = order.products.map(product => { return product.productId });
            const products = await productService.getByIdMany(proudctIds);
            setProducts(products);
        }

        fetchDeliveryOption(currentOrder.deliveryOption);
        fetchProducts(currentOrder);

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

    const getProductImage = product => {
        const _product = products.find(p => p._id === product.productId);

        console.log(_product);

        return _product ? _product.gallaryUrl : '';
    }
    return (
        <Grid container direction="row" justify="center">
            <Grid item xs={12} md={8}>
                <Paper classes={{ root: classes.productsView }} elevation={2}>
                    <Typography variant="h5">
                        <Box m={1}>Products</Box>
                    </Typography>

                    <List className={classes.list} dense>
                        {currentOrder && currentOrder.products.map(product => (<ProductElement product={product} classes={classes} imgUrl={`assets/product-images/${getProductImage(product)}`} />))}
                    </List>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
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
            </Grid>

            <Grid item xs={12} md={8}>
                <Paper>
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
                            <Typography variant="caption" display="inline">Subtotal:</Typography>
                            <Typography className={classes.floatRight} variant="caption" display="inline">${(subTotal / 100).toFixed(2)}</Typography>
                        </div>
                        <div>
                            <Typography variant="caption" display="inline">Tax:</Typography>
                            <Typography className={classes.floatRight} variant="caption" display="inline">${(tax / 100).toFixed(2)}</Typography>
                        </div>
                        {deliveryOption && <div>
                            <Typography variant="caption" display="inline">Shipping:</Typography>
                            <Typography className={classes.floatRight} variant="caption" display="inline">${(deliveryOption.price / 100).toFixed(2)}</Typography>
                        </div>}
                        <div>
                            <Typography variant="caption" display="inline">Total:</Typography>
                            <Typography className={classes.floatRight} variant="caption" display="inline">${(currentOrder.totalPrice / 100).toFixed(2)}</Typography>
                        </div>
                    </div>

                    <div className={classes.clearFloat} />

                </Paper>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    const { order } = state;

    return {
        currentOrder: order.currentOrder
    }
}

export default connect(mapStateToProps)(OrderPage);
