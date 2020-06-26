import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './product-card.styles';
import { ShoppingCart } from '@material-ui/icons';

import { Paper, Button } from '@material-ui/core';

const ProductCard = ({ product, onSelect, onAddToCart }) => {
    const classes = styles();

    const addToCart = (event, product) => {
        event.stopPropagation();

        onAddToCart(product);
    }

    return (
        <Paper elevation={2}>
            <div className={classes.productImageBox} >
                <span className={classes.productPrice}>${product.price / 100}</span>
                <img className={classes.productImage} src={`assets/product-images/${product.gallaryUrl}`} alt="" />
                <div className={classes.productImageOverlay} onClick={() => onSelect(product)}>
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<ShoppingCart />}
                        onClick={(event) => addToCart(event, product)}
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
