import React, { useState, useEffect } from 'react';
import { Dimensions, View, SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-navigation';
// import { Card, Title, Paragraph } from 'react-native-paper';
import { Avatar, Button, Card, Title, Paragraph, Text, ActivityIndicator, Colors  } from 'react-native-paper';
import styles from '../lib/Styles';

import { useUserData } from '../lib/User';

const { width, height } = Dimensions.get('window');

export default ({ navigation }) => {
    const user =  useUserData();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (user !== null) {
            setLoading(false);
        } 
    }, [user]);

    console.log('user on home page ====>', user);
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (
        <SafeAreaView style={ styles.container }>
            {loading ? <ActivityIndicator animating={true} color={Colors.red800} /> : <View style={ styles.container }><Card style={ styles.container, {width: width, height: height -75}}>
                <Card.Title title={user.username} subtitle="Card Subtitle" left={LeftContent} />
                <Card.Content>
                <Title>{user.username}</Title>
                <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
                </Card.Actions>
                <Button onPress={() => navigation.navigate('Conversations')}>Go to Conversations</Button>
            </Card></View>}
        </SafeAreaView>
    );
};