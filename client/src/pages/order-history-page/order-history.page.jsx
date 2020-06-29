import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';

import { Typography, Box } from '@material-ui/core';
import OrdersView from '../../components/orders-view/orders-view.component';

import { styles } from './order-history.styles';

const OrderHistoryPage = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const classes = styles();

    let history = useHistory();

    useEffect(() => {
        if (user.currentUser && user.isLoggedIn) {
            const fetchOrders = async (customerId) => {
                const orders = await orderService.getByCustomer(customerId);
                const productIds = orders.reduce((prevValue, currentValue) => {
                    return [...prevValue, ...currentValue.products.map(product => { return product.productId })];
                }, []);

                const products = await productService.getByIdMany(productIds);

                setOrders(orders);
                setProducts(products);
            }

            const customerId = user.currentUser._id;
            fetchOrders(customerId);
        } else {
            history.push('/signin');
        }

    }, []);

    return (
        <div>
            <div className={classes.main}>
                <Typography variant="h5">
                    <Box m={2}>Order history</Box>
                </Typography>
            </div>
            <OrdersView orders={orders} products={products} />
        </div>
    )
}

const mapStateToProps = state => {
    const { user } = state;

    return {
        user
    }
}

export default connect(mapStateToProps)(OrderHistoryPage);
