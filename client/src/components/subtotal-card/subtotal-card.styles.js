import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(3)
    },
    subtotal: {
        paddingBottom: theme.spacing(3)
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