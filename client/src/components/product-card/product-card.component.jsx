import React from 'react';
import PropTypes from 'prop-types';
import { productCardStyles } from '../shared/styles';
import { ShoppingCart } from '@material-ui/icons';

import { Paper, Button } from '@material-ui/core';

const ProductCard = ({ product, onSelect, onAddToCart }) => {
    const classes = productCardStyles();

    return (
        <Paper elevation={2}>
            <div className={classes.productImageBox} onClick={() => onSelect(product)}>
                <span className={classes.productPrice}>${product.price}</span>
                <img className={classes.productImage} src="assets\product-images\apple-audio-01.jpg" alt="" />
                <div className={classes.productImageOverlay}>
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<ShoppingCart />}
                        onClick={() => onAddToCart(product)}
                    >
                        Add to cart</Button>

                </div>
            </div>
            <div className={classes.productTitle}>
                <h5 style={{ margin: "0px" }}>{product.name}</h5>
            </div>
        </Paper>
    )
}

ProductCard.prototype = {
    product: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired
}

export default ProductCard;
