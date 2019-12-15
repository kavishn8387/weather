import { SET_PROFILE, UNSET_PROFILE } from './constants';


export function setProfile (data) {
    return {
      type: SET_PROFILE,
      data
    }
}

export function unsetProfile () {
  return {
    type: UNSET_PROFILE,
  }
}