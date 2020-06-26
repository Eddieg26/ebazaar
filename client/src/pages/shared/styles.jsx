import { makeStyles } from '@material-ui/core';

export const authFormStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
        height: "100%"
    },
    form: {
        width: "35%"
    }
}));