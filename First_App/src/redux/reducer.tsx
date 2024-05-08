import {SIGN_IN_USER_DETAILS} from './constants';

interface Action {
  type: string;
  data: boolean;
}

// Define the initial state of the cart as an empty array.
const initialState = {
  userSignIn: false,
};

// Create the 'reducer' function to handle actions related to the cart.
export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SIGN_IN_USER_DETAILS:
      return {...state, userSignIn: action.data};    
    default:
      return state;
  }
};
