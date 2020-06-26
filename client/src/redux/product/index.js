const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';

export const productAction = {
    setCurrentProduct: function (product) {
        return {
            type: SET_CURRENT_PRODUCT,
            payload: product
        }
    }
}

const initialState = {
    currentProduct: null
}

export default function product(state = initialState, action) {
    if (action.type === SET_CURRENT_PRODUCT) {
        return Object.assign({}, state, { currentProduct: action.payload });
    } else
        return state;
}