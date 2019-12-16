import {  
    FORECAST_REQUESTING, SET_FORECASTLIST, CLEAR_FORECAST
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

export const clearForecast = function clearForecast () {
  return {
      type: CLEAR_FORECAST,
  }
};