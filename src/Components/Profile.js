import React, { useState, useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, Card, Title, Paragraph, Appbar, ActivityIndicator, Colors  } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { useUserData } from '../lib/User';
import styles from '../lib/Styles';

const { width } = Dimensions.get('window');


export default ({ navigation }) => {
    const user =  useUserData();
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (user !== null) {
            setLoading(false);
        } 
    }, [user]);

    const _signOut = async () => {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log('error signing out: ', error);
        }
    };

    return (
        loading ? 
            <View style={styles.container}>
                <ActivityIndicator animating={true} color={Colors.red800} /> 
            </View>
            
        : 
            <>  
                <Appbar.Header width={width}>
                    <Appbar.BackAction onPress={()=>console.log('hello')} />
                    <Appbar.Content title={"effortLESS Chat"} />
                </Appbar.Header>
                <Card style={{width: width}}>
                    <Card.Title title='Profile' subtitle={user.screenName !== null ? user.screenName : ''} />
                    <Card.Content>
                    <Title>{user.username}</Title>
                    <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                    </Card.Actions>
                    <Button onPress={() => navigation.navigate('Home')}>Go to home screen</Button>
                    <Button onPress={_signOut}>Sign Out</Button>
                </Card>
            </>
    );
}