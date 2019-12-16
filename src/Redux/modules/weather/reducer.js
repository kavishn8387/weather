import {
    WEATHER_REQUESTING,
    WEATHER_SUCCESS,
    WEATHER_ERROR,
    SET_WEATHERLIST,
    CLEAR_WEATHER
} from './constants';

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
    data: []

    // @TODO   need imWEATHERvement in data {notstarted, in WEATHERgress, submitted, expired}  as a object.
};

const weather = function weatherReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WEATHERLIST:
            return {
                data: action
            }
        // Set the requesting flag and append a message to be shown
        case WEATHER_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Logging in...', time: new Date() }],
                errors: [],
            }

        // Successful?  Reset the WEATHER state.
        case WEATHER_SUCCESS:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
            }
        
        case CLEAR_WEATHER:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
                data: []
            }

        // Append the error returned from our api
        // set the success and requesting flags to false
        case WEATHER_ERROR:
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

export default weather;