import React, { useState, useEffect } from 'react';
import { Dimensions, View, FlatList, Pressable } from 'react-native';
import { Card, Appbar, ActivityIndicator, Colors, List, Divider } from 'react-native-paper';
import { useUserData } from '../lib/User';
import { useUserConversationData } from '../lib/UserAndConversations';
import styles from '../lib/Styles';


const { width, height } = Dimensions.get('window');

export default ({ navigation }) => {
    const user = useUserData();
    const userConversationData = useUserConversationData();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if(userConversationData && user) {
            setLoading(false);
        }
    }, [userConversationData]);
    console.log('conversations in conversation screen', userConversationData);

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
                        <Card.Title title='Conversations'/>
                        <Card.Content>
                        <FlatList
                            data={userConversationData}
                            keyExtractor={item => item.conversation.id}
                            ItemSeparatorComponent={() => <Divider />}
                            renderItem={({item}) => (
                                <Pressable
                                    onPress={() => navigation.navigate('ConversationDetails', { conversationId: item.conversation.id})}
                                >
                                    <List.Item
                                    title={item.conversation.name}
                                    titleNumberOfLines={2}
                                    />
                                </Pressable>
                            )}
                        />
                        </Card.Content>
                    </Card>
                </>
    );
};