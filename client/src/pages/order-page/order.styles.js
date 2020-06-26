import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: "32px"
    },
    productsView: {
        width: "60%",
        marginBottom: "16px"
    },
    shippingDetailsView: {
        width: "60%",
        marginBottom: "16px"
    },
    shippingDetails: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    totalsView: {
        float: "right",
        width: "260px",
        height: "100px",
        margin: "8px 16px"
    },
    formWidth: {
        width: "60%"
    },
    list: {
        width: '100%'
    },
    productView: {
        display: "flex",
        justifyContent: "center",
        width: "100%"
    },
    productImage: {
        objectFit: "cover",
        width: "64px",
        height: "64px",
        marginRight: "8px"
    },
    m1: {
        margin: theme.spacing(1)
    },
    mt1: {
        marginTop: theme.spacing(1)
    },
    mt2: {
        marginTop: theme.spacing(2)
    },
    mb1: {
        marginBottom: theme.spacing(1)
    },
    mb2: {
        marginBottom: theme.spacing(2)
    },
    ml1: {
        marginLeft: theme.spacing(1)
    },
    ml2: {
        marginLeft: theme.spacing(2)
    },
    mr1: {
        marginRight: theme.spacing(1)
    },
    mr2: {
        marginRight: theme.spacing(2)
    },
    floatRight: {
        float: "right"
    },
    clearFloat: {
        clear: "both"
    }
}));