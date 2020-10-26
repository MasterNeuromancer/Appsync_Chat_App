import React, { useState, useEffect } from 'react';
import { 
    Dimensions, 
    View, 
    FlatList, 
    Pressable } from 'react-native';
import { 
    Avatar, 
    Button, 
    Card, 
    Appbar, 
    ActivityIndicator, 
    Colors, 
    List, 
    Divider, 
    Paragraph, 
    Dialog, 
    Portal } from 'react-native-paper';
import { useUsersList } from '../lib/AppUsers';
import styles from '../lib/Styles';

const { width, height } = Dimensions.get('window');

export default ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const users = useUsersList();

    console.log('users on contacts screen ====>', users);
    
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

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
                        <Card.Title title='Contacts' left={LeftContent} />
                        <Card.Content>
                        <FlatList
                            data={users}
                            keyExtractor={item => item.id}
                            ItemSeparatorComponent={() => <Divider />}
                            renderItem={({item}) => (
                                <Pressable
                                    onPress={() => {
                                        console.log('item in contacts list', item);
                                        setShowDialog(true);
                                    }}
                                >
                                    <List.Item
                                    title={item.username}
                                    titleNumberOfLines={1}
                                    />
                                </Pressable>
                            )}
                        />
                        </Card.Content>
                        <Button onPress={() => navigation.navigate('Profile')}>Go to Profile</Button>
                    </Card>
                    <Portal>
                        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
                            <Dialog.Title>Create a new conversation with this user?</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph style={{alignSelf:'center'}}>Create</Paragraph>
                                <Button onPress={() => setShowDialog(false)}>Cancel</Button>
                            </Dialog.Content>
                        </Dialog>
                    </Portal>
                </>
    );
};