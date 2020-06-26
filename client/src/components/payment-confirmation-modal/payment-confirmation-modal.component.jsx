import React from 'react';

import { Paper, Typography, Modal, CircularProgress } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { styles } from './payment-confirmation-modal.styles';

const PaymentConfirmationModal = ({ show, response, onClose }) => {
    const classes = styles();

    const getBody = () => {
        if (!response) {
            return (
                <div className={classes.response}>
                    <CircularProgress color="primary" />
                </div>
            )
        }

        if (response.code == 0) {
            return (
                <div className={classes.response}>
                    <CheckCircleOutlineIcon color="primary" />
                    <Typography variant="subtitle2" display="inline">{response.message}</Typography>
                </div>
            )
        } else {
            return (
                <div className={classes.response}>
                    <CheckCircleOutlineIcon color="error" />
                    <Typography variant="subtitle2" display="inline">{response.message}</Typography>
                </div>
            )
        }
    }

    return (
        <Modal className={classes.modal} open={show} onClose={() => onClose()}>
            <div style={{ width: "25%", height: "20%" }}>
                <Paper style={{ height: "100%" }} elevation={3}>
                    {getBody()}
                </Paper>
            </div>
        </Modal>
    )

}

export default PaymentConfirmationModal
