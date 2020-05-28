import { makeStyles } from '@material-ui/core';

export const filterStyles = makeStyles(theme => ({
    filterBox: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2)
    },
    header: {
        margin: "0px",
        marginBottom: theme.spacing(2)
    }
}));

export const productCardStyles = makeStyles(theme => ({
    productImageBox: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    productImage: {
        objectFit: "cover",
        width: "100%"
    },
    productPrice: {
        backgroundColor: theme.palette.primary.main,
        color: "white",
        position: "absolute",
        fontWeight: 500,
        padding: "4px 12px",
        borderTopLeftRadius: "26px",
        borderBottomLeftRadius: "26px",
        overflow: "hidden",
        zIndex: 4,
        right: "0px",
        top: "24px"
    },
    productImageOverlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        opacity: 0,

        '&:hover': {
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 1,
            zIndex: 3
        }
    },
    productTitle: {
        padding: theme.spacing(2)
    }
}));

export const headerStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1
    }
}));