import {
  CARETEAM_REQUESTING,
  CARETEAM_SUCCESS,
  CARETEAM_CHANGE_STATUS_REQUESTING,
  CARETEAM_CHANGE_STATUS_SUCCESS
} from './constants';


export const mapiRequest = () => ({
    type: CARETEAM_REQUESTING
});

export const mapiSetCTeam = (mapi) => ({
  type: CARETEAM_SUCCESS,
  ...mapi
});

export const mapiChangeRequest = () => ({
  type: CARETEAM_CHANGE_STATUS_REQUESTING
});

export const mapiChangeSuccess = (mapi) => ({
  type: CARETEAM_CHANGE_STATUS_SUCCESS,
  ...mapi
});
