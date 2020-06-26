import React from 'react';

import SignInForm from '../../components/signin-form/signin-form.component';

import { authFormStyles } from '../shared/styles';

const SignInPage = () => {
    const classes = authFormStyles();

    return (
        <div className={classes.main}>
            <div className={classes.form}>
                <SignInForm />
            </div>
        </div>
    )
}

export default SignInPage;
