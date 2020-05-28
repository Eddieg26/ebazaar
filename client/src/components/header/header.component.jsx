import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Menu, MenuItem, SvgIcon, Typography } from '@material-ui/core';
import { AccountCircle, Receipt, Settings, ExitToApp, ShoppingCart } from '@material-ui/icons';
import { ReactComponent as BrandIsolated } from '../../brand-isolated-white.svg';
import { headerStyles } from '../shared/styles';

const Header = () => {
    let history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const classes = headerStyles();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" onClick={() => history.push('/')}>
                    <SvgIcon component={BrandIsolated} viewBox="0 0 61.04588110398212 60" />
                </IconButton>
                <Typography variant="h6" className={classes.title}>eBazaar</Typography>
                <IconButton
                    aria-label="shopping cart"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={() => history.push('/cart')}
                    color="inherit"
                >
                    <ShoppingCart />
                </IconButton>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Receipt color="primary" />
                        <span>Orders</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Settings color="primary" />
                        <span>Settings</span>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ExitToApp color="primary" />
                        <span>Sign out</span>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
