import React from 'react';
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => (
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