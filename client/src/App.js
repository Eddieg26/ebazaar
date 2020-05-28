import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

import HomePage from './pages/home-page/home.page';
import { Container } from '@material-ui/core';
import Header from './components/header/header.component';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Container>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Container>
      </BrowserRouter>
    </Provider>

  );
}

export default App;
