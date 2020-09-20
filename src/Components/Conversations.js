import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import styles from '../lib/Styles';

export default ({ navigation }) => (
    <SafeAreaView style={ styles.container }>
        <View>
            <Text>
                Hello from Conversations Screen!
            </Text>
            <Button
                title='go to home screen!'
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    </SafeAreaView>
);