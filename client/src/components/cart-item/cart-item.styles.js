import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    cartItem: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between"
    },
    cartItemRight: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    productName: {
        display: "inline"
    },
    productImage: {
        objectFit: "cover",
        width: "80px",
        height: "80px"
    },
    floatLeft: {
        float: "left"
    },
    floatRight: {
        float: "right"
    },
    floatClear: {
        clear: "both"
    }
}));