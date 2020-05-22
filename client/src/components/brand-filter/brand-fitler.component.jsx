import React from 'react';
import PropTypes from 'prop-types';
import { filterStyles } from '../shared/styles';

import { Paper, FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

const BrandFilter = ({ brands, onToggleBrand }) => {
    const classes = filterStyles();
    return (
        <Paper classes={{ root: classes.filterBox }} elevation={3}>
            <h3 className={classes.header}>Brands</h3>
            <FormGroup>
                {brands.map(brand => (
                    <FormControlLabel key={brand.name}
                        control={
                            <Checkbox
                                key={brand.name}
                                checked={brand.toggle}
                                onChange={() => onToggleBrand(brand)}
                                name={brand.name}
                                color="primary"
                            />
                        }
                        label={brand.name}
                    />
                ))}
            </FormGroup>
        </Paper>
    )
}

BrandFilter.prototype = {
    brands: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.number,
        name: PropTypes.string
    })).isRequired,

    onToggleBrand: PropTypes.func.isRequired
};

export default BrandFilter;
