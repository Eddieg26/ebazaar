const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const CLEAR_CART = 'CLEAR_CART';

export const cartAction = {

    addToCart: function (product) {
        return {
            type: ADD_TO_CART,
            payload: product
        }
    },

    removeFromCart: function (product) {
        return {
            type: REMOVE_FROM_CART,
            payload: product
        }
    },

    updateCartItem: function (product) {
        return {
            type: UPDATE_CART_ITEM,
            payload: product
        }
    },

    clearCart: function () {
        return {
            type: CLEAR_CART
        }
    }
}

const initialState = {
    products: []
}

export default function cart(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            if (!state.products.find(product => product._id === action.payload._id)) {
                return Object.assign({}, state, {
                    products: [...state.products, action.payload]
                })
            } else {
                return Object.assign({}, state, {
                    products: state.products.map(product => (product._id === action.payload._id ? Object.assign({}, product, { amount: product.amount + 1 }) : product))
                })
            }

        case REMOVE_FROM_CART:
            return Object.assign({}, state, {
                products: state.products.filter(product => (product._id !== action.payload._id))
            })

        case UPDATE_CART_ITEM:
            return Object.assign({}, state, {
                products: state.products.map(product => (product._id === action.payload._id ? Object.assign({}, product, { ...action.payload }) : product))
            })
        
        case CLEAR_CART: 
            return Object.assign({}, state, {
                products: []
            })

        default: return state;
    }
}