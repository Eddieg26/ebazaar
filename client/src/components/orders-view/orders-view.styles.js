import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    productView: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    productViewImage: {
        objectFit: "cover",
        width: "96px",
        height: "96px"
    },
    orderOuter: {
        width: "80%",
        marginBottom: theme.spacing(2)
    },
    orderInner: {
        display: "flex",
        justifyContent: "flex-start",
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column"
        },
    },
    orderDetails: {
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "row"
        },
        justifyContent: "space-between"
    },
    footer: {
        margin: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between"
    }
}));