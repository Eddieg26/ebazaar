import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        display: "flex",
        flexDirection: "row"
    },
    sidebar: {
        width: "20%",
        margin: "16px"
    },
    productsView: {
        width: "80%",
        margin: "16px"
    }
}));