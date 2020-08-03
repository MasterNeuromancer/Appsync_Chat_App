import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Hub, Auth } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react-native'

export default () => {
  const { signedIn, setSignedIn } = useState(null);
  useEffect(() => async {});
  const AppComponent = withAuthenticator(App, 
    {
      signUpConfig: {
        hiddenDefaults: ['phone_number']
      }
    },
    null, null, theme
    );
  return (
    <View style={styles.appContainer}>
      {!this.state.signedIn && <Logo />}
      <AppComponent {...this.props} />
    </View>
  );
};