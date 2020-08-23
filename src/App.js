import React from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './Components/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  )
}

export default withAuthenticator(App);