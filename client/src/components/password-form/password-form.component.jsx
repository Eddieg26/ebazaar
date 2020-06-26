import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userAction } from '../../redux/user';
import { userService } from '../../services/user.service';
import FormValidator from '../../utils/FormValidator';

import { Paper, TextField, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PasswordForm = ({ user }) => {
    const [info, setInfo] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [showErrors, setShowErrors] = useState({ oldPassword: false, newPassword: false, confirmPassword: false });
    const [result, setResult] = useState({ show: false, error: false, message: '' });

    let dispatch = useDispatch();

    const passwordMatch = () => { return info.newPassword === info.confirmPassword; }

    let validator = new FormValidator([
        {
            field: "oldPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Password is required"
        },
        {
            field: "newPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Password is required"
        },
        {
            field: "confirmPassword",
            method: "isEmpty",
            validWhen: false,
            message: "Password is required"
        },
        {
            field: "newPassword",
            method: "isLength",
            args: [{ min: 6, max: 12 }],
            validWhen: true,
            message: "Password must be between 6 and 12 characters"
        },
        {
            field: "confirmPassword",
            method: "isLength",
            args: [{ min: 6, max: 12 }],
            validWhen: true,
            message: "Password must be between 6 and 12 characters"
        },
        {
            field: "confirmPassword",
            method: passwordMatch,
            validWhen: true,
            message: 'Password and password confirmation do not match.'
        }
    ]);

    const [validation, setValidation] = useState(validator.valid());

    const handleChangeInfo = event => {
        const { name, value } = event.target;

        const newInfo = { ...info, [name]: value };

        setInfo(newInfo);
        setShowErrors({ ...showErrors, [name]: true });
    }

    const handleSubmit = event => {
        event.preventDefault();

        if (!validation.isValid) { return }

        const updateUser = async (id, oldPassword, newPassword) => {
            try {
                const user = await userService.update(id, oldPassword, newPassword);
                if (user) {
                    dispatch(userAction.update(user));
                    setResult({ show: true, error: false, message: 'Password successfully updated' });
                    setShowErrors({ oldPassword: false, newPassword: false, confirmPassword: false });
                } else {
                    setResult({ show: true, error: true, message: 'Failed to update password' });
                    setShowErrors({ oldPassword: false, newPassword: false, confirmPassword: false });
                }
                setInfo({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } catch (error) {
                setResult({ show: true, error: true, message: 'Failed to update password' });
                console.log(error);
            }
        }

        updateUser(user.currentUser._id, info.oldPassword, info.newPassword);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setResult({ ...result, show: false });
    };

    const validate = () => {
        const validationTest = validator.validate(info);
        setValidation(validationTest);
    }

    useEffect(() => {
        validate();
    }, [info]);

    const getValidation = field => {
        return (validation[field].isInvalid && showErrors[field]);
    }

    const getHelperText = field => {
        return validation[field].isInvalid && showErrors[field] ? validation[field].message : ""
    }

    return (
        <Paper elevation={3}>
            <form style={{ padding: "16px" }} onSubmit={handleSubmit}>
                <TextField variant="outlined" margin="dense" label="Old Password" name="oldPassword" type="password" value={info.oldPassword} error={getValidation("oldPassword")} helperText={getHelperText("oldPassword")} onChange={handleChangeInfo} fullWidth />

                <TextField variant="outlined" margin="dense" label="New Password" name="newPassword" type="password" value={info.newPassword} error={getValidation("newPassword")} helperText={getHelperText("newPassword")} onChange={handleChangeInfo} fullWidth />

                <TextField variant="outlined" margin="dense" label="Confirm Password" name="confirmPassword" type="password" value={info.confirmPassword} error={getValidation("confirmPassword")} helperText={getHelperText("confirmPassword")} onChange={handleChangeInfo} fullWidth />

                <Button style={{ marginTop: "8px" }} variant="contained" type="submit" color="primary">Update</Button>
            </form>

            <Snackbar open={result.show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={result.error ? 'error' : 'success'}>{result.message}</Alert>
            </Snackbar>
        </Paper>
    )
}

export default PasswordForm;
