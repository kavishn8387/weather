import { SET_PROFILE, UNSET_PROFILE } from './constants';

const initialSate = {
    userData: null
}

const reducer = function profileReducer(state = initialSate, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {
                userData: action.data
            }
        case UNSET_PROFILE:
            return {
                userData: null
            }
        default:
            return state
    }
}

export default reducer;