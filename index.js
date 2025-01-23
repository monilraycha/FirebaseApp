/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import EmailPassAuth from './screens/EmailPassAuth';
// import Analytics from './screens/Analytics';
// import Database from './screens/Database';
import Message from './screens/Message';
// import Notifee from './screens/Notifee';
import GoogleSignIn from './screens/GoogleSignIn';
// import EmailPassAuth from './screens/EmailPassAuth';
// import OneSignal from './screens/OneSignal';

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => EmailPassAuth);

// AppRegistry.registerComponent(appName, () => Analytics);
// AppRegistry.registerComponent(appName, () => Database);

// AppRegistry.registerComponent(appName, () => Message);
// AppRegistry.registerComponent(appName, () => Notifee);

// AppRegistry.registerComponent(appName, () => OneSignal);

AppRegistry.registerComponent(appName, () => GoogleSignIn);