/**
 * @format
 */

// Import necessary modules from React Native, the main 'App' component, and the 'app.json' file.
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Import the 'Provider' component from 'react-redux' to provide the Redux store to the app.
import {Provider} from 'react-redux';

// Import the 'store' from './src/redux/store' to use it with the 'Provider'.
import store from './src/redux/store';

// Create a new functional component named 'AppRedux'.
const AppRedux = () => (
  // Wrap the 'App' component inside the 'Provider' to provide the 'store' to the entire app.
  <Provider store={store}>
    <App />
  </Provider>
);

// Register the 'AppRedux' component as the root component of the application using 'AppRegistry'.
AppRegistry.registerComponent(appName, () => AppRedux);
