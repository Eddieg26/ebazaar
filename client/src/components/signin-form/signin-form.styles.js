import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    signinButton: {
        marginTop: theme.spacing(2)
    },
    signupLink: {
        marginTop: theme.spacing(1)
    },
    header: {
        marginBottom: theme.spacing(2)
    },
    brand: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
}));