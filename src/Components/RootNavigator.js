import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import Profile from './Profile';
import ConversationsScreen from './ConversationsScreen';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
}