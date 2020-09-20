import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './Home';
import Conversations from './Conversations';
import Contacts from './Contacts';
import Profile from './Profile';


const Tab = createMaterialBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor='#195e83'
      inactiveColor='#cce7e8'
      labeled={false}
      barStyle={{ backgroundColor: '#44bcd8' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home-variant-outline" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={Conversations}
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
  );
}