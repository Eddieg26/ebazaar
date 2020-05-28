import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import rootReducer from './reducers';

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        devToolsEnhancer(),
        preloadedState
    )
}