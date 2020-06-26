import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        justifyContent: "space-evenly",
        display: "flex",
        marginTop: "40px"
    },
    altMain: {
        justifyContent: "space-evenly",
        display: "flex",
        flexDirection: "column",
        marginTop: "40px"
    },
    emptyCart: {
        color: "#423f3f",
        fontSize: "32px",
        fontWeight: "500",
        textAlign: "center"
    }
}));