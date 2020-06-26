import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { Container } from '@material-ui/core';
import HomePage from './pages/home-page/home.page';
import ShoppingCartPage from './pages/shopping-cart-page/shopping-cart.page';
import ProductPage from './pages/product-page/product.page';
import CheckoutPage from './pages/checkout-page/checkout.page';
import SignInPage from './pages/signin-page/signin.page';
import SignUpPage from './pages/signup-page/signup.page';
import OrderHistoryPage from './pages/order-history-page/order-history.page';
import OrderPage from './pages/order-page/order.page';
import AccountPage from './pages/account-page/account.page';
import Header from './components/header/header.component';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8143D1',
    },
    secondary: {
      main: '#4CBBE5',
      contrastText: '#fff'
    },
  },
});

const store = configureStore();
const stripePromise = loadStripe('pk_test_qHEXOvvlME3zIwvld9HzHZiW');

function App() {
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
              <Header />
              <Container style={{ flexGrow: "1" }}>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/cart" component={ShoppingCartPage} />
                  <Route exact path="/checkout" component={CheckoutPage} />
                  <Route exact path="/signin" component={SignInPage} />
                  <Route exact path="/signup" component={SignUpPage} />
                  <Route exact path="/orderHistory" component={OrderHistoryPage} />
                  <Route exact path="/order" component={OrderPage} />
                  <Route exact path="/account" component={AccountPage} />
                  <Route path="/product" component={ProductPage} />
                </Switch>
              </Container>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </Elements>
    </Provider>

  );
}

export default App;
