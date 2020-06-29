import React from 'react';

import { Typography } from '@material-ui/core';

import { styles } from './styles';

const CheckoutProductItem = ({ product }) => {
    const classes = styles();

    return (
        <div className={"clearFix", classes.main}>
            <div className={classes.product}>
                <div className={classes.productImageView}>
                    <img className={classes.productImage} src={`assets/product-images/${product.gallaryUrl}`} alt="" />
                    <div>
                        <Typography variant="subtitle2">{product.name}</Typography>
                        <Typography variant="caption">Quantity: {product.amount}</Typography>
                    </div>
                </div>

                <Typography variant="subtitle1">${(product.price / 100).toFixed(2)}</Typography>
            </div>
        </div>
    )
}

export default CheckoutProductItem;
