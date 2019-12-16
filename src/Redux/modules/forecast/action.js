import {  
    FORECAST_REQUESTING, SET_FORECASTLIST
  } from './constants';
  
  export const forecastRequest = function forecastRequest (data) {
    // console.log('user', data)
    return {
      type: FORECAST_REQUESTING,
      ...data
    }
  };

  export const setForecastList = function setForecastList (data) {
    return {
        type: SET_FORECASTLIST,
        ...data
    }
};
