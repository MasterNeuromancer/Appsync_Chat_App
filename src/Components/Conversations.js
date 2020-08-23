import React from 'react';
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => (
    <View style={{ paddingTop: 15, flex: 1 }}>
        <Text>
            Hello from Conversations Screen!
        </Text>
        <Button
            title='go to home screen!'
            onPress={() => navigation.navigate('Home')}
        />
    </View>
);