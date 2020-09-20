import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import styles from '../lib/Styles';

import { useUserData } from '../lib/User';

export default ({ navigation }) => {
    const user =  useUserData();

    console.log('user on home page ====>', user);

    return (
        <SafeAreaView style={ styles.container }>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    Hello from Home Screen!
                </Text>
                <Button
                    title='go to conversations screen!'
                    onPress={() => navigation.navigate('Conversations')}
                />
            </View>
        </SafeAreaView>
    );
};