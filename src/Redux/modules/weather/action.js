import {  
    WEATHER_REQUESTING, SET_WEATHERLIST, CLEAR_WEATHER
  } from './constants';
  
  export const weatherRequest = function weatherRequest (data) {
    console.log('user', data)
    return {
      type: WEATHER_REQUESTING,
      ...data
    }
  };

  export const setWeatherList = function setWeatherList (data) {
    return {
        type: SET_WEATHERLIST,
        ...data
    }
};


export const clearWeather = function clearWeather (data) {
  return {
      type: CLEAR_WEATHER,
  }
};