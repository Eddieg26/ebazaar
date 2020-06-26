import React from 'react';

import { ListItemIcon, ListItemText, List, ListItem, Typography, Button } from '@material-ui/core';
import { Receipt, Settings, ExitToApp } from '@material-ui/icons';

import { styles } from './account-menu.styles';

const AccountMenu = ({ isLoggedIn, onSignout }) => {
    const classes = styles();

    const renderChildren = () => {
        if (isLoggedIn) {
            return (<List component="nav">
                <ListItem button component="a" href="/orderHistory">
                    <ListItemIcon><Receipt color="primary" /></ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItem>
                <ListItem button component="a" href="/account">
                    <ListItemIcon><Settings color="primary" /></ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button component="a" onClick={() => onSignout()}>
                    <ListItemIcon><ExitToApp color="primary" /></ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List>);
        } else {
            return (<List component="nav">
                <ListItem component="a" href="/signin">
                    <Button variant="contained" color="primary" fullWidth>Sign In</Button>
                </ListItem>
            </List>);
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6" className={classes.title}>Account</Typography>
            {renderChildren()}
        </div>
    )
}

export default AccountMenu;
