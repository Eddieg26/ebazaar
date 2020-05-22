import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filterStyles } from '../shared/styles';

import { Paper, OutlinedInput, FormControl, InputLabel, Button, makeStyles } from '@material-ui/core';

const customStyles = makeStyles(theme => ({
    button: {
        marginTop: theme.spacing(2)
    }
}));

const PriceFilter = ({ min, max, onChangePrice }) => {
    const [price, setPrice] = useState({ min, max });

    const applyChanges = event => {
        event.preventDefault();

        onChangePrice(price.min, price.max);
    }

    const handleChangePrice = event => {
        const { name, value } = event.target;
        console.log(event.target);
        setPrice({ ...price, [name]: value });
    }

    useEffect(() => {
        setPrice({ min, max });
    }, []);

    const sharedClasses = filterStyles();
    const customClasses = customStyles();

    return (
        <Paper classes={{ root: sharedClasses.filterBox }} elevation={3}>
            <h3 className={sharedClasses.header}>Price</h3>

            <FormControl variant="outlined" margin="dense">
                <InputLabel htmlFor="min-input">min</InputLabel>
                <OutlinedInput id="min-input" name="min" type="number" value={price.min} onChange={handleChangePrice} />
            </FormControl>

            <FormControl variant="outlined" margin="dense">
                <InputLabel htmlFor="max-input">max</InputLabel>
                <OutlinedInput id="max-input" name="max" type="number" value={price.max} onChange={handleChangePrice} />
            </FormControl>

            <Button classes={{ root: customClasses.button }} variant="contained" color="primary" fullWidth={true} disableElevation={true} onClick={applyChanges}>Apply</Button>
        </Paper>
    )
}

PriceFilter.prototype = {
    onChangePrice: PropTypes.func.isRequired
};

PriceFilter.defaultProps = {
    min: 0,
    max: 0
};

export default PriceFilter;
