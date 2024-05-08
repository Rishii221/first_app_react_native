import { SIGN_IN_USER_DETAILS } from './constants';

export const setSignInUserData = (data: boolean) => {
  return {
    type: SIGN_IN_USER_DETAILS,
    data: data,
  };
} 