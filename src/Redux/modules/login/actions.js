import {  
    LOGIN_REQUESTING, CLEAR_REQUESTING, LOGOUT_REQUESTING
  } from './constants';
  
  // In order to perform an action of type LOGIN_REQUESTING
  // we need an email and password
  const loginRequest = function loginRequest (user) {  
    return {
      type: LOGIN_REQUESTING,
      ...user
    }
  };
  
  // Since it's the only one here
  export default loginRequest;

  export const clearError = function clearRequest () {
    return {
      type: CLEAR_REQUESTING,
    } 
  }

  export const logoutRequest = function logoutRequest () {
    return {
      type: LOGOUT_REQUESTING,
    } 
  }