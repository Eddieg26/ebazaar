import React from 'react';
import { useHistory } from 'react-router-dom';

import { Paper, Button, Divider } from '@material-ui/core';
import { styles } from './subtotal-card.styles';

const SubtotalCard = ({ subtotal }) => {
    const classes = styles();

    let history = useHistory();

    return (
        <Paper elevation={2} variant="outlined">
            <div style={{ margin: "16px" }}>
                <div className={classes.subtotal}>
                    <span>Subtotal</span>
                    <span className={classes.floatRight}>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <Divider />
                <Button classes={{ root: classes.root }} fullWidth variant="contained" color="primary" onClick={() => history.push('/checkout')}>Check out</Button>
                <div className={classes.floatClear} />
            </div>
        </Paper>
    )
}

export default SubtotalCard;
