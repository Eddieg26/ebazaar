import React from 'react';

import { styles } from './cart-item.styles';

import { Typography, FormControl, InputLabel, Select, MenuItem, Button, ListItemText } from '@material-ui/core';

const CartItem = ({ product, onSelect, onUpdateProduct, onRemoveProduct }) => {
    const classes = styles();

    const getMenuItems = (start, amount) => {
        let menuItems = [];
        let count = start;
        while (count < amount + start) {
            menuItems.push(<MenuItem value={count}>{count}</MenuItem>);
            ++count;
        }

        return menuItems;
    }

    return (
        <div className={classes.cartItem} >
            <img className={classes.productImage} onClick={() => onSelect(product)} src={`assets/product-images/${product.gallaryUrl}`} alt="" />
            <ListItemText primary={product.name} />
            <div>
                <ListItemText primary={`$${(product.price / 100).toFixed(2)}`} />
                <FormControl margin="dense" variant="outlined">
                    <InputLabel id="amount-select-label">Qty</InputLabel>
                    <Select
                        labelId="amount-select-label"
                        id="amount-select"
                        value={product.amount}
                        onChange={event => onUpdateProduct(product, event.target.value)}
                    >
                        {getMenuItems(1, 10).map(menuItem => { return menuItem })}
                    </Select>
                </FormControl>
                <Button variant="text" color="secondary" onClick={() => onRemoveProduct(product)}>Remove</Button>
            </div>
        </div>
    )
}

export default CartItem;
