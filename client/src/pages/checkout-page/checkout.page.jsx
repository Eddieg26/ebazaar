import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { cartAction } from '../../redux/cart';
import { orderService } from '../../services/order.service';
import { stripeService } from '../../services/stripe.service';

import { Paper, List, ListItem, Typography, Button } from '@material-ui/core';
import PaymentConfirmationModal from '../../components/payment-confirmation-modal/payment-confirmation-modal.component';
import AddressForm from '../../components/address-form/address-form.component';
import DeliveryOptionSelector from '../../components/delivery-option-selector/delivery-option-selector.component';
import CheckoutProductItem from '../../components/checkout-page/checkout-product-item.component';

import { styles } from './checkout.styles';

const cardElementOptions = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

const CheckoutPage = ({ user, cart }) => {
    const [shippingAddress, setShippingAddress] = useState({ name: "", street: "", city: "", state: "", zipcode: "" });
    const [billingAddress, setBillingAddress] = useState({ name: "", street: "", city: "", state: "", zipcode: "" });
    const [selectedOption, setSelectedOption] = useState({ _id: 0, name: "Saver", price: 0 });
    const [orderInfo, setOrderInfo] = useState({ price: 0, deliveryType: "", deliveryPrice: 0, tax: 0, total: 0 });
    const [validations, setValidations] = useState({ shippingAddress: false, billingAddress: false });

    const [showModal, setShowModal] = useState(false);
    const [response, setResponse] = useState(null);

    const stripe = useStripe();
    const elements = useElements();
    const classes = styles();

    let dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        const price = cart.products.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.price * currentValue.amount;
        }, 0);

        const deliveryType = selectedOption.name;
        const deliveryPrice = selectedOption.price;

        const tax = (price + deliveryPrice) * 0.07;

        const total = price + deliveryPrice + tax;

        setOrderInfo({ price, deliveryType, deliveryPrice, tax, total });

    }, [selectedOption, cart]);

    const onSetSelectedOption = option => {
        setSelectedOption(option);
    }

    const onCheckout = () => {
        console.log(areFormsValid());
        if (!user.isLoggedIn || !user.currentUser) {
            history.push('/signin');
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        if (!areFormsValid()) {
            return;
        }

        setShowModal(true);

        const createPayment = async () => {
            const cardElement = elements.getElement(CardElement);

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('[error]', error);
            } else {
                const { id } = paymentMethod;
                const products = cart.products.map(product => ({ id: product._id, amount: product.amount }));

                const data = await stripeService.createCharge(id, products);
                setResponse(data);
            }
        }

        createPayment();

        const createOrder = async () => {
            const products = cart.products.map(product => (
                {
                    productId: product._id,
                    name: product.name,
                    amount: product.amount,
                    price: product.price
                }
            ));

            const order = {
                customerId: user.currentUser._id,
                products,
                deliveryOption: selectedOption._id,
                shippingAddress,
                billingAddress,
                totalPrice: orderInfo.total
            }

            await orderService.create(order);
        }

        createOrder();
    }

    const endPayment = () => {
        setShowModal(false);
        setResponse(null);
        dispatch(cartAction.clearCart());

        history.push('/');
    }

    const onValidateField = (name, isValid) => {
        setValidations({ ...validations, [name]: isValid });
    }

    const areFormsValid = () => {
        return validations.shippingAddress && validations.billingAddress;
    }

    return (
        <div className={classes.main}>
            <Paper classes={{ root: classes.productsView }} elevation={3}>
                <List>
                    {cart.products.map(product => (
                        <ListItem key={product._id}>
                            <CheckoutProductItem product={product} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <div className={classes.form}>
                <AddressForm name="shippingAddress" title="Shipping Address" onSetAddress={setShippingAddress} onSetIsValid={onValidateField} />
            </div>

            <div className={classes.form}>
                <DeliveryOptionSelector selectedOption={selectedOption} setSelectedOption={onSetSelectedOption} />
            </div>

            <div className={classes.form}>
                <AddressForm name="billingAddress" title="Billing Address" onSetAddress={setBillingAddress} onSetIsValid={onValidateField} />
            </div>

            <div className={classes.form}>
                <Paper elevation={3}>
                    <div className={classes.p2}>
                        <div>
                            <Typography className={classes.totalsLabel} variant="caption">Price</Typography>
                            <Typography variant="caption">${(orderInfo.price / 100).toFixed(2)}</Typography>
                        </div>
                        <div>
                            <Typography className={classes.totalsLabel} variant="caption">{orderInfo.deliveryType}</Typography>
                            <Typography variant="caption">${(orderInfo.deliveryPrice / 100).toFixed(2)}</Typography>
                        </div>
                        <div>
                            <Typography className={classes.totalsLabel} variant="caption">Tax</Typography>
                            <Typography variant="caption">${(orderInfo.tax / 100).toFixed(2)}</Typography>
                        </div>
                        <div className={classes.mb2}>
                            <Typography className={classes.totalsLabel} variant="caption">Total</Typography>
                            <Typography variant="caption">${(orderInfo.total / 100).toFixed(2)}</Typography>
                        </div>

                        <CardElement options={cardElementOptions} />

                        <Button disabled={!stripe && areFormsValid()} classes={{ root: classes.mt2 }} variant="contained" color="primary" onClick={() => onCheckout()} >Confirm Purchase</Button>
                        <PaymentConfirmationModal show={showModal} response={response} onClose={endPayment} />
                    </div>
                </Paper>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    const { user, cart } = state;

    return {
        user,
        cart
    }
}

export default connect(mapStateToProps)(CheckoutPage);
