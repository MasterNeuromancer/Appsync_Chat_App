import React from 'react';
import { View, Text, Button } from 'react-native';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                Hello from Profile Screen!
            </Text>
            <Button
                title='go to home screen!'
                onPress={() => navigation.navigate('Home')}
            />
            <View style={{paddingVertical:10}}>
                <Button
                    title='Sign Out'
                    onPress={_signOut}
                />
            </View>
        </View>
    );
}