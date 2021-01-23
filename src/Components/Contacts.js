import React, { useState, useEffect } from 'react';
import { 
    Dimensions, 
    View, 
    FlatList, 
    Pressable } from 'react-native';
import {
    Card, 
    Appbar, 
    ActivityIndicator, 
    Colors, 
    List, 
    Divider} from 'react-native-paper';
import AddConversationDialog from './AddConversationDialog';
import { useUserConversationData } from '../lib/UserAndConversations';
import { useUsersList } from '../lib/AppUsers';
import { useUserData } from '../lib/User';
import styles from '../lib/Styles';

const { width, height } = Dimensions.get('window');

export default ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [toUser, setToUser] = useState(null);
    const [otherUsers, setOtherUsers] = useState(null);
    const userConversationData = useUserConversationData();
    const users = useUsersList();
    const user =  useUserData();

    useEffect(() => {
        if(user && users) {
            // console.log('users in contacst', users);
            setLoading(false);
            setOtherUsers(users.filter((item) => item.name !== user.name));
        }
    }, [users, user]);

    // useEffect(() => {
    //     if(userConversationData){
    //         console.log('userConversationData in Contacts', userConversationData);
    //     }
    // }, [userConversationData]);

    const onContactPress = (item) => {
        // Create function that checks if there is a conversation that already exists
        // otherwise, open confirm Dialog to create new conversation between users
        
        try {
            if(item && userConversationData){
                console.log('item in onContactClick', item);
                console.log('userConversationData in onContactClick', userConversationData);
    
                const existingConversation = userConversationData.find(userConversation => userConversation.conversation.name.includes(item.name));
                const existingConversationId = existingConversation?.conversation?.id
                
                console.log('existing conversation', existingConversation);
                console.log('existingConversationId', existingConversationId);
                
                if(existingConversation){
                    navigation.navigate('ConversationDetails', { conversationId: existingConversationId});
                } else {
                    setToUser(item.name);
                    setShowDialog(true);
                }

            };
        } catch (error) {
            // Check user conversations for conversation names that include
            // both the user and the contact being clicked on
            // need to pass contact name to function
            console.log('onContactPress Error =====> ', error);
        };
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
                    <Card style={{width: width, height: height}}>
                        <Card.Title title='Contacts' />
                        <Card.Content>
                        <FlatList
                            data={otherUsers}
                            keyExtractor={item => item._id}
                            ItemSeparatorComponent={() => <Divider />}
                            renderItem={({item}) => (
                                <Pressable
                                    // onPress={() => {
                                    //     setToUser(item.name);
                                    //     setShowDialog(true);
                                    // }}
                                    onPress={()=> onContactPress(item)}
                                >
                                    <List.Item
                                    title={item.name}
                                    titleNumberOfLines={1}
                                    />
                                </Pressable>
                            )}
                        />
                        </Card.Content>
                    </Card>

                    {/* modal for adding new conversation (requires conversation members) */}
                    <AddConversationDialog showDialog={showDialog} setShowDialog={setShowDialog} toUser={toUser} currentUser={user.name}/>
                </>
    );
};