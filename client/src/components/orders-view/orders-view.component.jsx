import React from 'react';
import { useDispatch } from 'react-redux';

import { orderAction } from '../../redux/order';

import { Paper, Divider, Typography, Box, SvgIcon } from '@material-ui/core';
import { Receipt } from '@material-ui/icons';
import { styles } from './orders-view.styles';

const OrdersView = ({ orders }) => {
    const classes = styles();
    let dispatch = useDispatch();

    const setCurrentOrder = orderId => {
        const order = orders.find(_order => _order._id === orderId);
        dispatch(orderAction.setCurrentOrder(order));
    }

    const ProductView = ({ product }) => {
        return (
            <div className={classes.productView}>
                <div>
                    <img className={classes.productViewImage} src="assets\product-images\apple-audio-01.jpg" alt="" />
                    <Typography style={{ verticalAlign: "top" }} component="span" variant="subtitle2">
                        <Box display="inline" fontWeight="fontWeightBold" m={1}>{product.name}</Box>
                    </Typography>
                </div>
                <div>
                    <Typography variant="body2">${product.price.toFixed(2)}</Typography>
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
            <div style={{ width: "30%" }}>
                <Typography variant="caption">Order placed:</Typography>
                <Typography component="div">
                    <Box fontWeight="fontWeightLight" m={1}>{date}</Box>
                </Typography>
                <Typography variant="caption">Total:</Typography>
                <Typography component="div">
                    <Box fontWeight="fontWeightLight" m={1}>${total}</Box>
                </Typography>
                <div onClick={() => setCurrentOrder(orderId)}>
                    <SvgIcon component={Receipt} color="primary" />
                    <Typography style={{ verticalAlign: "top" }} href="/order" variant="body2" display="inline" component="a">View order</Typography>
                </div>
            </div>
        )
    }

    const OrderElement = ({ order }) => {
        return (
            <Paper className={classes.orderOuter} elevation={3}>
                <div className={classes.orderInner}>
                    <OrderDetailsElement orderId={order._id} date={getDateString(order.createdAt)} total={order.totalPrice.toFixed(2)} status="" />
                    <Divider orientation="vertical" flexItem />
                    <ProductView product={order.products[0]} />
                </div>
            </Paper>
        )
    }

    return (
        <div className={classes.main}>
            {orders.map(order => (
                <OrderElement order={order} />
            ))}
        </div>
    )
}

export default OrdersView
