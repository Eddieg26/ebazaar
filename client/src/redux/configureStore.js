import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers';
import { loadState, saveState } from '../localstorage';
import throttle from 'lodash/throttle';

export default function configureStore() {
    const preloadedState = loadState();

    const store = createStore(
        rootReducer,
        preloadedState,
        devToolsEnhancer()
    );

    store.subscribe(throttle(() => {
        saveState(store.getState())
    }, 1000));

    return store;
}