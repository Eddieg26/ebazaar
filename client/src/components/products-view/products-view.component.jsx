import React, { useState, useEffect } from 'react';

import { productService } from '../../services/product.service';
import { Grid } from '@material-ui/core';
import ProductCard from '../product-card/product-card.component';

const ProductsView = ({ filterOptions }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async filterOptions => {
            const productList = await productService.getByFilter(filterOptions);
            setProducts(productList);
        }

        fetchProducts(filterOptions);

    }, [filterOptions]);

    const onSelectProduct = product => {

    }

    const onAddProductToCart = product => {
        
    }

    return (
        <div>
            <Grid container direction="row" alignItems="flex-start" spacing={3}>
                {products.map(product => (
                    <Grid item xs={4}>
                        <ProductCard product={product} onSelect={onSelectProduct} onAddToCart={onAddProductToCart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default ProductsView;
