import React from 'react';
import { withAuthenticator } from 'aws-amplify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import ApolloAuthWrapper from './lib/ApolloAuthWrapper';
// need to improve login/signup styling
// import AmplifyTheme from 'aws-amplify-react-native/src/AmplifyTheme';

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
      <PaperProvider theme={theme}>
        <ApolloAuthWrapper/>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default withAuthenticator(App);