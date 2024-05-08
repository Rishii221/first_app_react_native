import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import SagaData from './saga';

// Create the Saga middleware.
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store with the rootReducer and Saga middleware.
const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});

// Run the Saga middleware with the 'SagaData' generator function.
sagaMiddleware.run(SagaData);

// Export the configured store.
export default store;
