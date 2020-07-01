import React from 'react';
import { useDispatch } from 'react-redux';

import { orderAction } from '../../redux/order';

import { Paper, Divider, Typography, Box, SvgIcon, Grid, IconButton, Button } from '@material-ui/core';
import { Receipt, Delete } from '@material-ui/icons';
import { styles } from './orders-view.styles';

const OrdersView = ({ orders, products, onDeleteOrder }) => {
    const classes = styles();
    let dispatch = useDispatch();

    const setCurrentOrder = order => {
        dispatch(orderAction.setCurrentOrder(order));
    }

    const getProductImage = product => {
        const _product = products.find(p => p._id === product.productId);

        return _product ? _product.gallaryUrl : '';
    }

    const ProductView = ({ product }) => {
        return (
            <div className={classes.productView}>
                <div style={{ marginLeft: "16px" }}>
                    <img className={classes.productViewImage} src={`assets/product-images/${getProductImage(product)}`} alt="" />
                    <Typography style={{ verticalAlign: "top" }} component="span" variant="subtitle2">
                        <Box display="inline" fontWeight="fontWeightBold" m={1}>{product.name}</Box>
                    </Typography>
                </div>
                <div style={{ marginRight: "16px" }}>
                    <Typography variant="body2">${(product.price / 100).toFixed(2)}</Typography>
                    <Typography variant="body2">Qty: {product.amount}</Typography>
                </div>
            </div>
        )
    }

    const getDateString = date => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        return new Date(date).toLocaleDateString('en-US', options);
    }

    const OrderDetailsElement = ({ orderId, date, total, status }) => {
        return (
            <div>
                <div className={classes.orderDetails}>
                    <div style={{ margin: "16px" }}>
                        <Typography display="inline" variant="caption" component="span">Order placed:</Typography>
                        <Typography display="inline" variant="caption" component="span">
                            <Box m={1} fontWeight="fontWeightLight">{date}</Box>
                        </Typography>
                    </div>

                    <div style={{ margin: "16px" }}>
                        <Typography display="inline" variant="caption" component="span">Total: </Typography>
                        <Typography display="inline" variant="caption" component="span">
                            <Box display="inline" fontWeight="fontWeightLight">${total}</Box>
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }

    const OrderElement = ({ order }) => {
        return (
            <Paper elevation={3}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={12} sm={4}>
                        <OrderDetailsElement orderId={order._id} date={getDateString(order.createdAt)} total={(order.totalPrice / 100).toFixed(2)} status="" />
                    </Grid>
                    <Divider orientation="middle" flexItem />
                    <Grid item xs={12} sm={8}>
                        <ProductView product={order.products[0]} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.footer}>
                            <Button variant="text" color="primary" href="/order" startIcon={<Receipt />} onClick={() => setCurrentOrder(order)}>View order</Button>

                            <IconButton component="span" onClick={() => onDeleteOrder(order)}>
                                <Delete color="error" />
                            </IconButton>
                        </div>

                    </Grid>
                </Grid>
            </Paper>
        )
    }

    return (
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
            {orders.map(order => (
                <Grid item xs={12} sm={12} md={8}>
                    <OrderElement order={order} />
                </Grid>
            ))}
        </Grid>
    )
}

export default OrdersView
