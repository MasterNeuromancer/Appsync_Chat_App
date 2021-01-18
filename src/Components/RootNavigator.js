import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ApolloProvider} from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import {ApolloClient} from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import config from '../../aws-exports';
import Conversations from './Conversations';
import ConversationDetails from './ConversationDetails';
import Contacts from './Contacts';
import Profile from './Profile';

const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name="Conversations" component={Conversations} headerMode='none'/>
      <Stack.Screen name="ConversationDetails" component={ConversationDetails} headerMode='none'/>
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

export default ({token}) => {
  const url = config.aws_appsync_graphqlEndpoint;
  const region = config.aws_appsync_region;
  const auth = {
    type: config.aws_appsync_authenticationType,
    jwtToken: token,
  };

  const httpLink = createHttpLink({ uri: url });

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink(url, httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Tab.Navigator
        initialRouteName="Conversations"
        activeColor='#195e83'
        inactiveColor='#cce7e8'
        labeled={false}
        barStyle={{ backgroundColor: '#44bcd8' }}
      >
        <Tab.Screen
          name="Conversations"
          component={MessageStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="message-text-outline" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="account-group-outline" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="clipboard-account-outline" color={color} size={24} />
            ),
          }}
        />
      </Tab.Navigator>
    </ApolloProvider>
  );
};
