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
import { useUsersList } from '../lib/AppUsers';
import { useUserData } from '../lib/User';
import styles from '../lib/Styles';

const { width, height } = Dimensions.get('window');

export default ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [toUser, setToUser] = useState(null);
    const [otherUsers, setOtherUsers] = useState(null);
    const users = useUsersList();
    const user =  useUserData();

    useEffect(() => {
        if(user && users) {
            setLoading(false);
            setOtherUsers(users.filter((item) => item.name !== user.name));
        }
    }, [users, user]);

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
                                    onPress={() => {
                                        setToUser(item.name);
                                        setShowDialog(true);
                                    }}
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
                    <AddConversationDialog showDialog={showDialog} setShowDialog={setShowDialog} toUser={toUser} currentUser={user.username}/>
                </>
    );
};