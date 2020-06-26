import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userAction } from '../../redux/user';
import { userService } from '../../services/user.service';

import { AppBar, Toolbar, IconButton, Menu, SvgIcon, Typography, Badge } from '@material-ui/core';
import { AccountCircle, ShoppingCart } from '@material-ui/icons';
import { ReactComponent as BrandIsolated } from '../../assets/brand-isolated-white.svg';
import AccountMenu from '../account-menu/account-menu';

import { styles } from './header.styles';

const Header = ({ user, cart }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    let history = useHistory();
    let dispatch = useDispatch();
    let cartAmount = cart.products.reduce((prevValue, currentValue) => prevValue + currentValue.amount, 0);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onSignout = async () => {
        await userService.signout();

        dispatch(userAction.signout());

        history.push('/signin');
    }

    const classes = styles();

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
                    <Badge badgeContent={cartAmount} color="secondary" invisible={cartAmount === 0}>
                        <ShoppingCart />
                    </Badge>
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
                    <AccountMenu isLoggedIn={user.isLoggedIn && user.currentUser} onSignout={onSignout} />
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state => {
    const { user, cart } = state;

    return {
        user,
        cart
    }
}

export default connect(mapStateToProps)(Header);
