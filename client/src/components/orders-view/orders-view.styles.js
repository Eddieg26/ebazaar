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
        padding: "24px"
    },
    productViewImage: {
        objectFit: "cover",
        width: "96px",
        height: "96px"
    },
    orderOuter: {
        width: "60%",
        marginBottom: theme.spacing(2)
    },
    orderInner: {
        display: "flex",
        justifyContent: "flex-start",
        padding: theme.spacing(2)
    }
}));