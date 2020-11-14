import React, { useState, useEffect } from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {ApolloProvider} from '@apollo/client';
import appSyncClient from './lib/appsyncApollo';
// import { Hub, Auth } from 'aws-amplify'

// need to improve login/signup styling
// import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme';

import RootNavigator from './Components/RootNavigator';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#44bcd8',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <ApolloProvider client={appSyncClient}>
        <PaperProvider theme={theme}>
          <RootNavigator/>
        </PaperProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);