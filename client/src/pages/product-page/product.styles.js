import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column"
        },
    },
    productImage: {
        objectFit: "cover",
        width: "100%",
        height: "100%"
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