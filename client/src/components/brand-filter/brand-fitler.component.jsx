import React from 'react';
import PropTypes from 'prop-types';

import { Paper, FormControlLabel, FormGroup, Checkbox, makeStyles } from '@material-ui/core';

const styles = makeStyles(theme => ({
    p16: {
        padding: "16px"
    },
    header: {
        margin: "0px 0px 16px 0px"
    }
}));

const BrandFilter = ({ brands, onToggleBrand }) => {
    const classes = styles();
    return (
        <Paper classes={{ root: classes.p16 }} elevation={3}>
            <h3 className={classes.header}>Brands</h3>
            <FormGroup>
                {brands.map(brand => (
                    <FormControlLabel
                        control={
                            <Checkbox
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
