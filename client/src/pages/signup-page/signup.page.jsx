import React from 'react';

import SignUpForm from '../../components/signup-form/signup-form.component';

import { authFormStyles } from '../shared/styles';

const SignUpPage = () => {
    const classes = authFormStyles();

    return (
        <div className={classes.main}>
            <div className={classes.form}>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUpPage;
