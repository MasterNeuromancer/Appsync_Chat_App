import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

import { useUserData } from '../lib/User';

const HomeScreen = ({ navigation }) => {
    const user =  useUserData();

    console.log('user on home page ====>', user);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                Hello from Home Screen!
            </Text>
            <Button
                title='go to conversations screen!'
                onPress={() => navigation.navigate('Conversations')}
            />
        </View>
    );
};

export default HomeScreen;