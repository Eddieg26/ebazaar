import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { productService } from '../../services/product.service';
import { cartAction } from '../../redux/cart';

import { Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ProductCard from '../product-card/product-card.component';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const ProductsView = ({ filterOptions }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [productsPerPage] = useState(12);

    let dispatch = useDispatch();

    const paginate = (event, page) => setCurrentPage(page);

    useEffect(() => {
        const fetchProducts = async filterOptions => {
            const productList = await productService.getByFilter(filterOptions);
            setProducts(productList);
        }

        fetchProducts(filterOptions);

    }, [filterOptions]);

    useEffect(() => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));

    }, [products, currentPage])

    const onSelectProduct = product => {

    }

    const onAddProductToCart = product => {
        dispatch(cartAction.addToCart({ id: product.id }));
    }

    const classes = useStyles();

    return (
        <div>
            <Grid container direction="row" alignItems="flex-start" spacing={3}>
                {currentProducts.map(product => (
                    <Grid item xs={4}>
                        <ProductCard product={product} onSelect={onSelectProduct} onAddToCart={onAddProductToCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.root}>
                <Pagination count={Math.ceil(products.length / productsPerPage)} color="primary" page={currentPage} onChange={paginate} />
            </div>
        </div>
    )
}

export default ProductsView;
