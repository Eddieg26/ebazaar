const SIGNIN = 'SIGNIN';
const SIGNOUT = 'SIGNOUT';
const UPDATE = 'UPDATE';

export const userAction = {
    singin: function (user) {
        return {
            type: SIGNIN,
            payload: user
        }
    },

    signout: function () {
        return { type: SIGNOUT }
    },

    update: function (user) {
        return {
            type: UPDATE,
            payload: user
        }
    }
}

const initialState = {
    currentUser: null,
    isLoggedIn: false
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case SIGNIN:
            return Object.assign({}, state, { currentUser: action.payload, isLoggedIn: true });

        case SIGNOUT:
            return Object.assign({}, state, { currentUser: null, isLoggedIn: false });

        case UPDATE:
            return Object.assign({}, state, { currentUser: action.payload, isLoggedIn: true });

        default:
            return state;
    }
}