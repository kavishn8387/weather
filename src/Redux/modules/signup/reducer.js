import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR, REGISTER_USER } from "./constants";


const initialState = {
    requesting:  false,
    successful: false,
    messages: [],
    errors: [],
    user: []
};

const signup = function signupReducer (state= initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                user: action
            }
        case SIGNUP_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Signing in ...', time: new Date() }],
                errors: [],
            }
        case SIGNUP_SUCCESS:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
            }
        case SIGNUP_ERROR:
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
}

export default signup;