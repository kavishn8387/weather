import {
    PRO_REQUESTING,
    PRO_SUCCESS,
    PRO_ERROR,
    SET_PROLIST
} from './constants';

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
    data: []

    // @TODO   need improvement in data {notstarted, in progress, submitted, expired}  as a object.
};

const pro = function proReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROLIST:
            return {
                data: action
            }
        // Set the requesting flag and append a message to be shown
        case PRO_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Logging in...', time: new Date() }],
                errors: [],
            }

        // Successful?  Reset the pro state.
        case PRO_SUCCESS:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
            }

        // Append the error returned from our api
        // set the success and requesting flags to false
        case PRO_ERROR:
            return {
                errors: state.errors.concat([{
                    body: action.error.toString(),
                    time: new Date(),
                }]),
                messages: [],
                requesting: false,
                successful: false,
            }

        default:
            return state
    }
};

export default pro;