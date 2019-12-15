import { CLIENT_SET, CLIENT_UNSET, CLIENT_SET_INITIAL } from './constants';

export function setInitial (data) {
  return {
    type: CLIENT_SET_INITIAL,
    data
  }
}
export function setClient (token) {
  return {
    type: CLIENT_SET,
    token
  }
}

export function unsetClient () {
  return {
    type: CLIENT_UNSET
  }
}