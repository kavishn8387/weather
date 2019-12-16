import { CLIENT_SET, CLIENT_UNSET, CLIENT_SET_INITIAL } from './constants';

const initialSate = {
    id: null,
    token: null,
    userData: null
}

const reducer = function clientReducer(state = initialSate, action) {
    // console.log(state);
    switch (action.type) {
        case CLIENT_SET_INITIAL:
            return {
                userData: action.data
            }
        case CLIENT_SET:
            const data =  state.userData !== undefined && state.userData !== null && state.userData.email || {}; // eslint-disable-line
            return {
                ...data,
                ...action.token
            }

        case CLIENT_UNSET:
            return {
                id: null,
                token: null
            }

        default:
            return state
    }
}

export default reducer;