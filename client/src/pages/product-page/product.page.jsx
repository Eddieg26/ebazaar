import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { cartAction } from '../../redux/cart';

import { Typography, Select, FormControl, InputLabel, MenuItem, Button } from '@material-ui/core';

import { styles } from './product.styles';

const ProductPage = ({ currentProduct }) => {
    const [amount, setAmount] = useState(1);
    const classes = styles();

    let dispatch = useDispatch();

    const onAddToCart = () => {
        const product = Object.assign({}, currentProduct, { amount });
        dispatch(cartAction.addToCart(product));
    }

    return (
        <div>
            <div className={classes.main}>
                <img className={classes.productImage} src="..\assets\product-images\apple-audio-01.jpg" alt="" />
                <div className={classes.productInfo}>
                    <Typography variant="h5">{currentProduct.name}</Typography>
                    <Typography variant="subtitle1">${(currentProduct.price / 100).toFixed(2)}</Typography>
                    <Typography className={classes.productDescription} variant="body2">{currentProduct.description}</Typography>
                    <FormControl margin="dense" style={{ marginRight: "16px" }} variant="outlined">
                        <InputLabel id="amount-select-label">Qty</InputLabel>
                        <Select
                            labelId="amount-select-label"
                            id="amount-select"
                            value={amount}
                            onChange={event => setAmount(event.target.value)}
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
                    <Button variant="contained" color="primary" onClick={() => onAddToCart()}>Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { product } = state;

    return {
        currentProduct: product.currentProduct
    }
}

export default connect(mapStateToProps)(ProductPage);
