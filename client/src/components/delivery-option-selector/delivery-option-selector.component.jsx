import React, { useState, useEffect } from 'react';

import { deliveryOptionService } from '../../services/deliveryOption.service';

import { Paper, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const DeliveryOptionSelector = ({ selectedOption, setSelectedOption }) => {
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    useEffect(() => {
        const fetchDeliveryOptions = async () => {
            const deliveryOptionList = await deliveryOptionService.getAll();
            setDeliveryOptions(deliveryOptionList);
        }

        fetchDeliveryOptions();
    }, []);

    const handleChange = event => {
        const id = Number.parseInt(event.target.value);
        const option = deliveryOptions.find(option => option._id === id);
        setSelectedOption(option);
    }

    return (
        <Paper elevation={3}>
            <div style={{ padding: "16px" }}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Delivery</FormLabel>
                    <RadioGroup aria-label="delivery" name="deliveryOptions" value={selectedOption._id} onChange={handleChange}>
                        {deliveryOptions.map(option => (
                            <FormControlLabel
                                key={option._id}
                                value={option._id}
                                control={<Radio color="primary" />}
                                label={`${option.name} $${option.price.toFixed(2)}        (${option.minDeliverySpeed} - ${option.maxDeliverySpeed} Days)`} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
        </Paper>
    )
}

export default DeliveryOptionSelector;
