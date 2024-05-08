import {SIGN_IN_USER_DETAILS} from './constants';

const initialState = {
  userSignIn: false,
};


export const checkSignInUser = (state = initialState, action: { type: any; data: any; }) => {
  switch (action.type) {
    case SIGN_IN_USER_DETAILS:
      return {...state, userSignIn: action.data};
    default:
      return state;
  }
};
