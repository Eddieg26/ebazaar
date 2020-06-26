import React from 'react';

import { styles } from './cart-item.styles';

import { Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

const CartItem = ({ product, onSelect, onUpdateProduct, onRemoveProduct }) => {
    const classes = styles();
    
    return (
        <div className={classes.cartItem} >
            <img className={classes.productImage} onClick={() => onSelect(product)} src="assets\product-images\apple-audio-01.jpg" alt="" />
            <Typography variant="subtitle2">{product.name}</Typography>
            <div className={classes.floatRight, classes.cartItemRight}>
                <Typography variant="subtitle1">${(product.price / 100).toFixed(2)}</Typography>
                <FormControl margin="dense" variant="outlined">
                    <InputLabel id="amount-select-label">Qty</InputLabel>
                    <Select
                        labelId="amount-select-label"
                        id="amount-select"
                        value={product.amount}
                        onChange={event => onUpdateProduct(product, event.target.value)}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="text" color="secondary" onClick={() => onRemoveProduct(product)}>Remove</Button>
            </div>
        </div>
    )
}

export default CartItem;
