import { IDLE_SET } from './constants';

export function setIdleTimeFlag (data) {
  return {
    type: IDLE_SET,
    ...data
  }
}
