import React from 'react';
import AWSAppSyncClient from 'aws-appsync';
import Amplify, { Auth } from 'aws-amplify';
import config from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import { Provider } from 'react-native-paper';

import RootNavigator from './Components/RootNavigator';

Amplify.configure(config);

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region, 
  auth: {
    type: config.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken.jwtToken
  }
});

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Provider>
            <RootNavigator/>
          </Provider>
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default withAuthenticator(App);