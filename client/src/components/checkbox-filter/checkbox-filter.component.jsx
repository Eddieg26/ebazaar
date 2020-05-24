import React from 'react';
import PropTypes from 'prop-types';
import { filterStyles } from '../shared/styles';

import { Paper, FormControlLabel, FormGroup, Checkbox } from '@material-ui/core';

const CheckboxFilter = ({ title, items, onToggle }) => {
    const classes = filterStyles();
    return (
        <Paper classes={{ root: classes.filterBox }} elevation={3}>
            <h3 className={classes.header}>{title}</h3>
            <FormGroup>
                {items.map(item => (
                    <FormControlLabel key={item.name}
                        control={
                            <Checkbox
                                key={item.name}
                                checked={item.toggle}
                                onChange={() => onToggle(item)}
                                name={item.name}
                                color="primary"
                            />
                        }
                        label={item.name}
                    />
                ))}
            </FormGroup>
        </Paper>
    )
}

CheckboxFilter.prototype = {
    title: PropTypes.string.isRequired,

    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        toggle: PropTypes.bool.isRequired
    })).isRequired,

    onToggleBrand: PropTypes.func.isRequired
};

export default CheckboxFilter;
