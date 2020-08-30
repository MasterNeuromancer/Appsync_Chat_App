import { AppRegistry, LogBox } from 'react-native';

import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'Possible Unhandled Promise Rejection',
  'Remote debugger',
]);

AppRegistry.registerComponent(appName, () => App);
