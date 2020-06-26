import React from 'react';
import { connect } from 'react-redux';

import { Paper, Typography, Avatar } from '@material-ui/core';
import PasswordForm from '../../components/password-form/password-form.component';

import { styles } from './account.page.styles';

const AccountPage = ({ user }) => {
    const classes = styles();

    return (
        <div className={classes.main}>
            <div className={classes.account}>
                <Typography className={classes.label} variant="h5">Account</Typography>
                <Paper classes={{ root: classes.accountContent }} elevation={3}>
                    <Avatar className={classes.avatar} alt="" src={`https://i.pravatar.cc/150?u=${user.currentUser.email}`} />
                    <Typography className={classes.email} display="inline" variant="subtitle2">{user.currentUser.email}</Typography>
                </Paper>
            </div>

            <div className={classes.password}>
                <Typography className={classes.label} variant="h5">Update Password</Typography>
                <div className={classes.passwordForm}>
                    <PasswordForm user={user} />
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    const { user } = state;

    return {
        user
    }
}

export default connect(mapStateToProps)(AccountPage);
