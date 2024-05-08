import {takeLatest} from 'redux-saga/effects';
import {SIGN_IN_USER_DETAILS} from './constants';

function* setUserSignIn(action:{ type: string; data: boolean}){

  try {
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

function* SagaData() {
  yield takeLatest(SIGN_IN_USER_DETAILS, setUserSignIn);
}

export default SagaData;
