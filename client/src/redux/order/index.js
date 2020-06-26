const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';

export const orderAction = {
    setCurrentOrder: function (order) {
        return {
            type: SET_CURRENT_ORDER,
            payload: order
        }
    }
}

const initialState = {
    currentOrder: null
}

export default function order(state = initialState, action) {
    if (action.type === SET_CURRENT_ORDER)
        return Object.assign({}, state, { currentOrder: action.payload });
    
    return state;
}