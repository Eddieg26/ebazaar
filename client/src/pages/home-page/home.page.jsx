import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import ProductsView from '../../components/products-view/products-view.component';
import FiltersContainer from '../../components/filters-container/filters-container.component';

const HomePage = () => {
    const [filterOptions, setFilterOptions] = useState({});

    return (
        <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sm={4} md={3}>
                <FiltersContainer onSetFilter={setFilterOptions} />
            </Grid>
            <Grid item xs={12} sm={8}>
                <ProductsView filterOptions={filterOptions} />
            </Grid>
        </Grid>
    )
}

export default HomePage;
