import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLEAR_REQUESTING,
    LOGOUT_REQUESTING
} from './constants';

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
};

const login = function loginReducer(state = initialState, action) {
    switch (action.type) {
        // Set the requesting flag and append a message to be shown
        case LOGIN_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Logging in...', time: new Date() }],
                errors: [],
            }
        case LOGOUT_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Logging out...', time: new Date() }],
                errors: [],
            }

        // Successful?  Reset the login state.
        case LOGIN_SUCCESS:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
            }

        // Append the error returned from our api
        // set the success and requesting flags to false
        case LOGIN_ERROR:
            return {
                errors: action.error,
                messages: [],
                requesting: false,
                successful: false,
            }

        case CLEAR_REQUESTING:
            return {
                errors: null,
                messages: null
            }

        default:
            return state
    }
};

export default login;