import React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import styles from '../lib/Styles';
import { Auth } from 'aws-amplify';

export default ({ navigation }) => {

    const _signOut = async () => {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <View>
                <Text>
                    Hello from Profile Screen!
                </Text>
                <Button
                    title='go to home screen!'
                    onPress={() => navigation.navigate('Home')}
                />
                <View>
                    <Button
                        title='Sign Out'
                        onPress={_signOut}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}