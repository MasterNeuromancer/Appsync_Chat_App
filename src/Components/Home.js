import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Button } from 'react-native';
import { API, Auth } from 'aws-amplify';

import { getUser } from '../graphql/queries';

export default ({ navigation }) => {
    useEffect(() => {
        fetchUser();
    });

    async function fetchUser() {
        const authUser = Auth.currentAuthenticatedUser().then(user => console.log('user =====>', user));
        console.log('current auth user =========>', authUser);
        // try {
        //     const userData = await API.graphql({
        //         query: getUser,
        //         variables: { limit: 1000 }
        //     });
        //     console.log('user data: ', userData);
        // } catch (err) {
        //     console.log('error: ', err);
        // }
    }

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