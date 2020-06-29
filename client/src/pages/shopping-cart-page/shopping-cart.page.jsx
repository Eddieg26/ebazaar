import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CartItemsView from '../../components/cart-items-view/cart-items-view.component';
import SubtotalCard from '../../components/subtotal-card/subtotal-card';
import { Grid, Button } from '@material-ui/core';

import { styles } from './shopping-cart.styles';

const ShoppingCartPage = ({ cart }) => {
    const [subtotal, setSubtotal] = useState(0);
    const classes = styles();

    useEffect(() => {
        const total = cart.products.reduce((prevValue, currentValue) => {
            return prevValue + currentValue.price * currentValue.amount;
        }, 0);

        setSubtotal(total);
    }, [cart]);

    return (
        <div className={classes.main}>
            {cart.products.length > 0 ?
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12} sm={12} md={8}>
                        <CartItemsView products={cart.products} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <SubtotalCard subtotal={subtotal} />
                    </Grid>
                </Grid>
                :
                <div className={classes.altMain}>
                    <div className={classes.emptyCart}>Your cart is empty</div>
                    <Button variant="text" color="primary" href="/">Continue shopping</Button>
                </div>
            }

        </div>
    )
}

const mapStateToProps = state => {
    const { cart } = state;

    return {
        cart
    }
}

export default connect(mapStateToProps)(ShoppingCartPage);
