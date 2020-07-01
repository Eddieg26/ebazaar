import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';

import { Typography, Box, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import OrdersView from '../../components/orders-view/orders-view.component';

import { styles } from './order-history.styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const OrderHistoryPage = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [deleteResponse, setDeleteResponse] = useState({ show: false, error: false, message: '' });
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

    const onDeleteOrder = order => {
        const deleteOrder = async (orderId) => {
            const response = await orderService.deleteOrder(orderId);

            const deleteResponse = {
                show: true,
                error: (response === null),
                message: (response ? 'Order successfully deleted' : 'Could not delete order')
            }

            setDeleteResponse(deleteResponse);
        }

        deleteOrder(order._id);
    }

    const onCloseAlert = () => {
        setDeleteResponse({ show: false, error: false, message: '' });
        window.location.reload();
    }

    return (
        <div>
            <div className={classes.main}>
                <Typography variant="h5">
                    <Box m={2}>Order history</Box>
                </Typography>
            </div>
            <OrdersView orders={orders} products={products} onDeleteOrder={onDeleteOrder} />
            {deleteResponse.show && <Snackbar open={deleteResponse.show} autoHideDuration={1500} onClose={() => onCloseAlert()}>
                <Alert onClose={() => onCloseAlert()} severity={deleteResponse.error? 'error' : 'success'}>{deleteResponse.message}</Alert>
            </Snackbar>}
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
