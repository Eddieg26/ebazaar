import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    productsView: {
        width: "50%"
    },
    form: {
        width: "50%",
        marginTop: theme.spacing(2)
    },
    p2: {
        padding: theme.spacing(2)
    },
    totalsLabel: {
        marginRight: theme.spacing(2)
    },
    mt2: {
        marginTop: theme.spacing(2)
    },
    mb2: {
        marginBottom: theme.spacing(2)
    }

}));