import { AppRegistry, LogBox } from 'react-native';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import App from './src/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'Possible Unhandled Promise Rejection',
  'Remote debugger',
  // Source is Amplify SDK
  'AsyncStorage has been extracted',
  'Require cycle: node_modules/@aws-amplify',
]);

Amplify.configure(config);

AppRegistry.registerComponent(appName, () => App);
