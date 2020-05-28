const FETCH_CART = 'FETCH_CART';
const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

export const cartAction = {
    fetchCart: function () {
        return {
            type: FETCH_CART
        }
    },

    setCart: function (id, userId, products) {
        return {
            type: SET_CART,
            payload: { id, userId, products }
        }
    },

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
    }
}

const initialState = {
    id: "",
    userId: "",
    products: [],
    isLoading: false
}

export default function cart(state = initialState, action) {
    switch (action.type) {
        case FETCH_CART:
            return Object.assign({}, state, { isLoading: true });

        case SET_CART:
            return Object.assign({}, state, { id: action.payload.id, userId: action.payload.userId, products: action.payload.products, isLoading: false });

        case ADD_TO_CART:
            if (!state.products.includes(action.payload)) {
                return Object.assign({}, state, {
                    products: [...state.products, action.payload]
                })
            } else {
                return Object.assign({}, state, {
                    products: state.products.map(product => (product.id === action.payload.id ? Object.assign({}, product, { amount: product.amount + 1 }) : product))
                })
            }

        case REMOVE_FROM_CART:
            return Object.assign({}, state, {
                products: state.products.filter(product => (product.id !== action.payload.id))
            })

        case UPDATE_CART_ITEM:
            return Object.assign({}, state, {
                products: state.products.map(product => (product.id === action.payload.id ? Object.assign({}, product, { ...action.payload }) : product))
            })

        default: return state;
    }
}