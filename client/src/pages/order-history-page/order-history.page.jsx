import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { orderService } from '../../services/order.service';

import { Typography, Box } from '@material-ui/core';

import OrdersView from '../../components/orders-view/orders-view.component';

import { styles } from './order-history.styles';

const OrderHistoryPage = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const classes = styles();

    let history = useHistory();

    useEffect(() => {
        if (user.currentUser && user.isLoggedIn) {
            const fetchOrders = async (customerId) => {
                const orders = await orderService.getByCustomer(customerId);
                setOrders(orders);
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
            <OrdersView orders={orders} />
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
