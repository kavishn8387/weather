import { SIGNUP_START, REGISTER_USER, SIGNUP_REQUESTING, SIGNUP_COMPLETION } from './constants';

export const signupStart = function signupStart (user) {
    return {
        type: SIGNUP_START,
        ...user
    }
};

export const signupRequest = function signupRequest (user) {
    return {
        type: SIGNUP_REQUESTING,
        ...user
    }
};

export const setUserRequest = function setUserRequest (user) {
    return {
        type: REGISTER_USER,
        ...user
    }
};
