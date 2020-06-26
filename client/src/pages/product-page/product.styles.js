import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        display: "flex",
        justifyContent: "center",
        marginTop: "32px"
    },
    productImage: {
        width: "35%",
        height: "auto",
        objectFit: "cover"
    },
    productInfo: {
        marginLeft: "16px",
        width: "50%"
    },
    productDescription: {
        marginTop: "16px",
        marginBottom: "16px"
    }
}));