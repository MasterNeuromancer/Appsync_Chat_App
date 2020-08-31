import React, { useState, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { Hub, Auth } from 'aws-amplify'

// need to improve login/signup styling
// import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme';

import RootNavigator from './Components/RootNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <PaperProvider>
            <RootNavigator/>
          </PaperProvider>
        </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default withAuthenticator(App);