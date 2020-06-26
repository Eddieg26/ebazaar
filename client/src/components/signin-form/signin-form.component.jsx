import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { userAction } from '../../redux/user';
import { userService } from '../../services/user.service';
import FormValidator from '../../utils/FormValidator';

import { Paper, Typography, Button, TextField } from '@material-ui/core';

import { styles } from './signin-form.styles';
import { ReactComponent as BrandLogo } from '../../assets/default-monochrome.svg';

const SignInForm = () => {
    const [info, setInfo] = useState({ email: '', password: '' });
    const [showErrors, setShowErrors] = useState({ email: false, password: false, result: false });

    let dispatch = useDispatch();
    let history = useHistory();
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

        setShowErrors({ email: true, password: true });

        if (!validationTest.isValid) {
            return;
        }

        const signin = async (email, password) => {
            try {
                const user = await userService.signin(email, password);
                console.log(user);
                if (user) {
                    dispatch(userAction.singin(user));
                    history.push('/');
                } else {
                    setInfo({ ...info, password: '' });
                    setShowErrors({ ...showErrors, result: true });
                }
            } catch (error) {
                setShowErrors({ ...showErrors, result: true });
            }
        }

        signin(info.email, info.password);
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
            <Typography classes={{ root: classes.header }} align="center" display="block" variant="h5">Sign in to eBazaar</Typography>
            <Paper elevation={3}>
                <form onSubmit={handleSubmit}>
                    <div style={{ padding: "16px" }}>
                        <TextField variant="outlined" margin="dense" label="Email" name="email" type="email" value={info.email} error={getValidation("email")} helperText={getHelperText("email")} onChange={handleChangeInfo} fullWidth />

                        <TextField variant="outlined" margin="dense" label="Password" name="password" type="password" value={info.password} error={getValidation("password")} helperText={getHelperText("password")} onChange={handleChangeInfo} fullWidth />

                        {showErrors.result && <Typography classes={{ root: classes.signupLink }} color="secondary" align="center" display="block" variant="body2">Email or Password is incorrect</Typography>}

                        <Button classes={{ root: classes.signinButton }} variant="contained" color="primary" type="submit" fullWidth>Sign In</Button>

                        <Typography classes={{ root: classes.signupLink }} align="center" display="block" variant="body2" component="a" href="/signup">Don't have an account yet? Sign Up</Typography>
                    </div>
                </form>
            </Paper>
        </div>
    )
}

export default SignInForm;
