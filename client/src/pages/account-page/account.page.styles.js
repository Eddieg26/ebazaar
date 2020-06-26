import { makeStyles } from '@material-ui/core';

export const styles = makeStyles(theme => ({
    main: {
        marginTop: "32px"
    },
    label: {
        width: "30%"
    },
    account: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%",
        marginBottom: "16px"
    },
    accountContent: {
        display: "flex",
        justifyContent: "flex-start",
        width: "60%",
        marginLeft: "16px"
    },
    avatar: {
        margin: "16px",
        width: "64px",
        height: "64px"
    },
    email: {
        alignSelf: "center"
    },
    password: {
        display: "flex",
        justifyContent: "flex-start",
        width: "100%"
    },
    passwordForm: {
        width: "60%",
        marginLeft: "16px"
    }
}));