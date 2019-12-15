import {  
    PRO_REQUESTING, SET_PROLIST
  } from './constants';
  
  // In order to perform an action of type LOGIN_REQUESTING
  // we need an email and password
  export const proRequest = function proRequest (user) {
    return {
      type: PRO_REQUESTING,
      ...user
    }
  };

  export const setProList = function setProList (user) {
    return {
        type: SET_PROLIST,
        ...user
    }
};
