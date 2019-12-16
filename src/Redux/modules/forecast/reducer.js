import {
    FORECAST_REQUESTING,
    FORECAST_SUCCESS,
    FORECAST_ERROR,
    SET_FORECASTLIST,
    CLEAR_FORECAST
} from './constants';

const initialState = {
    requesting: false,
    successful: false,
    messages: [],
    errors: [],
    data: []

};

const forecast = function forecastReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FORECASTLIST:
            return {
                data: action
            }
        // Set the requesting flag and append a message to be shown
        case FORECAST_REQUESTING:
            return {
                requesting: true,
                successful: false,
                messages: [{ body: 'Logging in...', time: new Date() }],
                errors: [],
            }

        // Successful?  Reset the FORECAST state.
        case FORECAST_SUCCESS:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: true,
            }
        case CLEAR_FORECAST:
            return {
                errors: [],
                messages: [],
                requesting: false,
                successful: false,
                data: []
            }

        // Append the error returned from our api
        // set the success and requesting flags to false
        case FORECAST_ERROR:
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

export default forecast;