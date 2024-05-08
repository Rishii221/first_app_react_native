import {combineReducers, Reducer} from 'redux';
import {reducer} from './reducer';
import { checkSignInUser} from './userReducer';

export interface RootState {
  cart: any; 
  checkSignIn: any; 
}

// Define the Action type for your actions.
interface Action {
  type: string;
  data: boolean;
}



const rootReducer: Reducer<RootState, Action> = combineReducers({
  cart: reducer,
  checkSignIn: checkSignInUser,
});

export default rootReducer;
