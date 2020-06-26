import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CartItemsView from '../../components/cart-items-view/cart-items-view.component';
import SubtotalCard from '../../components/subtotal-card/subtotal-card';
import { Button } from '@material-ui/core';

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
        <div>
            {cart.products.length > 0 ?
                <div className={classes.main}>
                    <div style={{ width: "50%" }}>
                        <CartItemsView products={cart.products} />
                    </div>
                    <div style={{ width: "30%" }}>
                        <SubtotalCard subtotal={subtotal} />
                    </div>
                </div>
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
