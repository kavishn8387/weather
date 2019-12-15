import { IDLE_SET } from './constants';

const initialSate = {
    time: false,
    email: undefined
}

const reducer = function idleSetReducer(state = initialSate, action) {
    switch (action.type) {
        case IDLE_SET:
            return {
                time: action.time,
                email: action.email || state.email
            }
        
        default:
            return state
    }
}

export default reducer;