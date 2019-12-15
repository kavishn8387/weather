import {
    CARETEAM_REQUESTING,
    CARETEAM_SUCCESS,
    CARETEAM_ERROR,

    CARETEAM_CHANGE_STATUS_REQUESTING,
    CARETEAM_CHANGE_STATUS_SUCCESS,
    CARETEAM_CHANGE_STATUS_ERROR
} from './constants';

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
};

const mapi = function (state = initialState, action) {
    switch (action.type) {
        case CARETEAM_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Fetching Careteam ...', time: new Date() }],
                errors: [],
            }
        case CARETEAM_SUCCESS:
            return {
                successful: true,
                mapiList: action.data
            }
        case CARETEAM_ERROR:
            return {
                errors: action,
                successful: false,
            }

        case CARETEAM_CHANGE_STATUS_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Changing Careteam ...', time: new Date() }],
                errors: [],
                teamId: action.teamId
            }
        case CARETEAM_CHANGE_STATUS_SUCCESS:
            return {
                successful: true,
                mapiList: action.data
            }
        case CARETEAM_CHANGE_STATUS_ERROR:
            return {
                errors: action,
                successful: false,
            }
        default:
            return state
    }
};

export default mapi;