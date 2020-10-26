import React, { useState, useEffect } from 'react';
import { Dimensions, View, FlatList, Pressable } from 'react-native';
import { Avatar, Button, Card, Appbar, ActivityIndicator, Colors, List, Divider } from 'react-native-paper';
import { useUserConversationData } from '../lib/UserAndConversations';
import styles from '../lib/Styles';

const { width, height } = Dimensions.get('window');

export default ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const conversations = useUserConversationData();
    
    console.log('conversations in conversation screen', conversations);
    
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
    const threads = [
        {
          _id: 0,
          text: 'New room created.',
          createdAt: new Date().getTime(),
        },
        {
          _id: 1,
          text: 'Hello!',
          createdAt: new Date().getTime(),
        }
    ];

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
                    <Card style={{width: width, height: height}}>
                        <Card.Title title='Conversations' left={LeftContent} />
                        <Card.Content>
                        <FlatList
                            data={threads}
                            keyExtractor={item => item._id}
                            ItemSeparatorComponent={() => <Divider />}
                            renderItem={({item}) => (
                                <Pressable
                                    onPress={() => navigation.navigate('Contacts')}
                                >
                                    <List.Item
                                    title={item.text}
                                    description='Item description'
                                    titleNumberOfLines={1}
                                    descriptionNumberOfLines={1}
                                    />
                                </Pressable>
                            )}
                        />
                        </Card.Content>
                        <Button onPress={() => navigation.navigate('Contacts')}>Go to Contacts</Button>
                    </Card>
                </>
    );
};