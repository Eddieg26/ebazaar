import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { cartAction } from '../../redux/cart';
import { productAction } from '../../redux/product';

import CartItem from '../cart-item/cart-item';
import { Paper, List, ListItem } from '@material-ui/core';

const CartItemsView = ({ products }) => {
    let dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        console.log(products);
    }, [products]);

    const onRemoveProduct = product => {
        dispatch(cartAction.removeFromCart(product));
    }

    const onUpdateProduct = (product, amount) => {
        const newProduct = Object.assign({}, product, { amount });
        dispatch(cartAction.updateCartItem(newProduct));
    }

    const onSelectProduct = product => {
        dispatch(productAction.setCurrentProduct(product));
        history.push(`/product/${product.name}`);
    }

    return (
        <Paper elevation={2}>
            <List>
                {products.map(product => (
                    <ListItem key={product._id}>
                        <CartItem product={product} onSelect={onSelectProduct} onUpdateProduct={onUpdateProduct} onRemoveProduct={onRemoveProduct} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default CartItemsView;
