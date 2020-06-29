import { makeStyles } from '@material-ui/core';

export const authFormStyles = makeStyles(theme => ({
    main: {
        display: "flex",
        justifyContent: "center",
        marginTop: "32px",
        height: "100%"
    },
    form: {
        [theme.breakpoints.down(901)]: {
            width: "70%"
        },
        [theme.breakpoints.up(901)]: {
            width: "50%"
        },
        [theme.breakpoints.up(1200)]: {
            width: "40%"
        },
    }
}));