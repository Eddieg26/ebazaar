import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { productService } from '../../services/product.service';
import { cartAction } from '../../redux/cart';
import { productAction } from '../../redux/product';

import { Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ProductCard from '../product-card/product-card.component';

const useStyles = makeStyles((theme) => ({
    main: {
        margin: "16px",
    }
}));

const ProductsView = ({ filterOptions }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [productsPerPage] = useState(12);

    let dispatch = useDispatch();
    let history = useHistory();

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
        dispatch(productAction.setCurrentProduct(product));
        history.push(`/product`);
    }

    const onAddProductToCart = product => {
        dispatch(cartAction.addToCart({ ...product, amount: 1 }));
    }

    const classes = useStyles();

    return (
        <div className={classes.main}>
            <Grid container direction="row" alignItems="center" spacing={3}>
                {currentProducts.map(product => (
                    <Grid item xs={12} sm={6} md={4}>
                        <ProductCard product={product} onSelect={onSelectProduct} onAddToCart={onAddProductToCart} />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Pagination count={Math.ceil(products.length / productsPerPage)} color="primary" page={currentPage} onChange={paginate} />
                </Grid>
            </Grid>
        </div>
    )
}

export default ProductsView;
