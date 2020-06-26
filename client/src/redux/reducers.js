import { combineReducers } from 'redux';

import cart from './cart';
import product from './product';
import user from './user';
import order from './order';

const appReducer = combineReducers({
    cart,
    product,
    user,
    order
});

const rootReducer = (state, action) => {
    if (action.type === 'SIGNOUT')
        state = undefined;
    
    return appReducer(state, action);
}

export default rootReducer;