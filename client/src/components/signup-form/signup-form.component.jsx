import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userAction } from '../../redux/user';
import { userService } from '../../services/user.service';
import FormValidator from '../../utils/FormValidator';

import { Paper, Typography, Button, TextField } from '@material-ui/core';

import { styles } from './signup-form.styles'
import { ReactComponent as BrandLogo } from '../../assets/default-monochrome.svg';

const SignUpForm = () => {
    const [info, setInfo] = useState({ email: '', password: '', confirmPassword: '' });
    const [showErrors, setShowErrors] = useState({ email: false, password: false, confirmPassword: false, result: false });

    let dispatch = useDispatch();
    let history = useHistory();

    const passwordMatch = () => { return info.password === info.confirmPassword; }

    let validator = new FormValidator([
        {
            field: "email",
            method: "isEmpty",
            validWhen: false,
            message: "Email is required"
        },
        {
            field: "email",
            method: "isEmail",
            validWhen: true,
            message: "This is not a valid email"
        },
        {
            field: "password",
            method: "isEmpty",
            validWhen: false,
            message: "Password is required"
        },
        {
            field: "password",
            method: "isLength",
            args: [{ min: 6, max: 12 }],
            validWhen: true,
            message: "Password must be between 6 and 12 characters"
        },
        {
            field: "confirmPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Confirm password is required"
        },
        {
            field: "confirmPassword",
            method: "isLength",
            args: [{ min: 6, max: 12 }],
            validWhen: true,
            message: "Confirm Password must be between 6 and 12 characters"
        },
        {
            field: 'confirmPassword',
            method: passwordMatch,
            validWhen: true,
            message: 'Password and password confirmation do not match.'
        }
    ]);

    const [validation, setValidation] = useState(validator.valid());

    const handleChangeInfo = event => {
        const { name, value } = event.target;

        setInfo({ ...info, [name]: value });
    }

    const handleSubmit = event => {
        event.preventDefault();

        const validationTest = validator.validate(info);
        setValidation(validationTest);

        setShowErrors({ email: true, password: true, confirmPassword: true });

        if (!validationTest.isValid) {
            return;
        }

        const { email, password } = info;

        const signup = async (email, password) => {
            try {
                const user = await userService.signup(email, password);
                if (user) {
                    // Sign in to newly created account
                    dispatch(userAction.singin(user));
                    history.push('/');
                } else {
                    setShowErrors({ ...showErrors, result: true });
                }
            } catch (error) {
                setShowErrors({ ...showErrors, result: true });
            }
        }

        signup(email, password);
    }

    const getValidation = field => {
        return (validation[field].isInvalid && showErrors[field]);
    }

    const getHelperText = field => {
        return validation[field].isInvalid && showErrors[field] ? validation[field].message : ""
    }

    const classes = styles();

    return (
        <div>
            <div className={classes.brand}>
                <div style={{ width: "50%" }}>
                    <BrandLogo />
                </div>
            </div>

            <Typography classes={{ root: classes.header }} align="center" display="block" variant="h5">Create An Account</Typography>

            <Paper elevation={3}>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: "16px" }}>
                        <TextField variant="outlined" margin="dense" label="Email" name="email" type="email" value={info.email} error={getValidation("email")} helperText={getHelperText("email")} onChange={handleChangeInfo} fullWidth />

                        <TextField variant="outlined" margin="dense" label="Password" name="password" type="password" value={info.password} error={getValidation("password")} helperText={getHelperText("password")} onChange={handleChangeInfo} fullWidth />

                        <TextField variant="outlined" margin="dense" label="Confirm Password" name="confirmPassword" type="password" value={info.confirmPassword} error={getValidation("confirmPassword")} helperText={getHelperText("confirmPassword")} onChange={handleChangeInfo} fullWidth />

                        {showErrors.result && <Typography classes={{ root: classes.signinLink }} color="secondary" align="center" display="block" variant="body2">Could not create account</Typography>}

                        <Button classes={{ root: classes.signupButton }} variant="contained" color="primary" type="submit" fullWidth>Sign Up</Button>

                        <Typography classes={{ root: classes.signinLink }} align="center" display="block" variant="body2" component="a" href="/signin">Already have an account? Sign In</Typography>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default SignUpForm;
