import React, { useState, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
// import { Hub, Auth } from 'aws-amplify'

// need to improve login/signup styling
// import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme';

import RootNavigator from './Components/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
          <RootNavigator/>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);