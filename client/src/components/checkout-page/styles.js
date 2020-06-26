import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        width: "100%" 
    },
    product: {
        display: "flex",
        justifyContent: "space-between"
    },
    productImageView: {
        display: "flex",
        justifyContent: "flex-start"
    },
    productImage: {
        objectFit: "cover",
        marginRight: "32px",
        width: "75px",
        height: "75px"
    }
}));