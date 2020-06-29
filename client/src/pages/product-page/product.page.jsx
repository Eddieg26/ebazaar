import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { cartAction } from '../../redux/cart';

import { Typography, Select, FormControl, InputLabel, MenuItem, Button, Grid } from '@material-ui/core';

import { styles } from './product.styles';

const ProductPage = ({ currentProduct }) => {
    const [amount, setAmount] = useState(1);
    const classes = styles();

    let dispatch = useDispatch();

    const onAddToCart = () => {
        const product = Object.assign({}, currentProduct, { amount });
        dispatch(cartAction.addToCart(product));
    }

    const getMenuItems = (start, amount) => {
        let menuItems = [];
        let count = start;
        while (count < amount + start) {
            menuItems.push(<MenuItem key={count} value={count}>{count}</MenuItem>);
            ++count;
        }

        return menuItems;
    }

    return (
        <div>
            <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs={12} sm={4}>
                    <img className={classes.productImage} src={`assets/product-images/${currentProduct.gallaryUrl}`} alt="" />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography variant="h5">{currentProduct.name}</Typography>
                    <Typography variant="subtitle1">${(currentProduct.price / 100).toFixed(2)}</Typography>
                    <Typography variant="body2">{currentProduct.description}</Typography>
                    <FormControl margin="dense" style={{ marginRight: "16px" }} variant="outlined">
                        <InputLabel id="amount-select-label">Qty</InputLabel>
                        <Select
                            labelId="amount-select-label"
                            id="amount-select"
                            value={amount}
                            onChange={event => setAmount(event.target.value)}
                        >
                            {getMenuItems(1, 10).map(menuItem => { return menuItem })}
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={() => onAddToCart()}>Add to cart</Button>
                </Grid>
            </Grid>
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
