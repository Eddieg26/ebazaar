import React, { useState, useEffect } from 'react';

import FormValidator from '../../utils/FormValidator';

import { Paper, Typography, TextField } from '@material-ui/core';

const AddressForm = ({ name, title, onSetAddress, onSetIsValid }) => {
    const [address, setAddress] = useState({ name: '', street: '', city: '', state: '', zipcode: '' });
    const [showErrors, setShowErrors] = useState({ name: false, street: false, city: false, zipcode: false });

    let validator = new FormValidator([
        {
            field: "name",
            method: "isEmpty",
            validWhen: false,
            message: "Name is required"
        },
        {
            field: "street",
            method: "isEmpty",
            validWhen: false,
            message: "Street is required"
        },
        {
            field: "city",
            method: "isEmpty",
            validWhen: false,
            message: "City is required"
        },
        {
            field: "state",
            method: "isEmpty",
            validWhen: false,
            message: "State is required"
        },
        {
            field: "zipcode",
            method: "isEmpty",
            validWhen: false,
            message: "Zipcode is required"
        },
        {
            field: "zipcode",
            method: "isPostalCode",
            args: ["US"],
            validWhen: true,
            message: "Zipcode is invalid"
        },
    ]);

    const [validation, setValidation] = useState(validator.valid());

    const handleChangeAddress = event => {
        const { name, value } = event.target;

        const newAddress = { ...address, [name]: value };

        setAddress(newAddress);
        onSetAddress(newAddress);
        setShowErrors({ ...showErrors, [name]: true });
    }

    const validate = () => {
        const validationTest = validator.validate(address);
        setValidation(validationTest);
        onSetIsValid(name, validationTest.isValid);
    }

    useEffect(() => {
        validate();
    }, [address]);

    const getValidation = field => {
        return (validation[field].isInvalid && showErrors[field]);
    }

    const getHelperText = field => {
        return validation[field].isInvalid && showErrors[field] ? validation[field].message : ""
    }

    return (
        <Paper elevation={3}>
            <div style={{ padding: "16px" }}>
                <Typography variant="body1">{title}</Typography>
                <TextField variant="outlined" margin="dense" label="Name" name="name" type="text" value={address.name} error={getValidation("name")} helperText={getHelperText("name")} onChange={handleChangeAddress} fullWidth />

                <TextField variant="outlined" margin="dense" label="Street" name="street" type="text" value={address.street} error={getValidation("street")} helperText={getHelperText("street")} onChange={handleChangeAddress} fullWidth />

                <TextField variant="outlined" margin="dense" label="City" name="city" type="text" value={address.city} error={getValidation("city")} helperText={getHelperText("city")} onChange={handleChangeAddress} fullWidth />

                <TextField variant="outlined" margin="dense" label="State" name="state" type="text" value={address.state} error={getValidation("state")} helperText={getHelperText("state")} onChange={handleChangeAddress} style={{ marginRight: "8px", width: "60%" }} />

                <TextField variant="outlined" margin="dense" label="Zipcode" name="zipcode" type="text" value={address.zipcode} error={getValidation("zipcode")} helperText={getHelperText("zipcode")} onChange={handleChangeAddress} />
            </div>
        </Paper>
    )
}

export default AddressForm;
