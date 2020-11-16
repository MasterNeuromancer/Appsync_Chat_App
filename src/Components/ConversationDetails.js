import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import { Card, Appbar, ActivityIndicator, Colors, List, Divider } from 'react-native-paper';
import styles from '../lib/Styles';
import {
    GiftedChat,
  } from 'react-native-gifted-chat';
import { API, graphqlOperation } from 'aws-amplify';
import uuid from 'uuid-random';
import { createMessage } from '../graphql/mutations';
import { useUserData } from '../lib/User';
import useConversationMessages from '../lib/ConversationMessages';

export default  ({ route }) => {
  const threadId = route.params.thread.conversation.id;
  console.log('navigation params', threadId);
  // const [messages, setMessages] = useState([]);
  const user =  useUserData(); 

  
  useEffect(() => {
    if(user){
      console.log('empty user in the conversation details page', user.id);
    }
  }, [user]);
    
  const messages = useConversationMessages(threadId);

  // useEffect(() => {
  //     if(messages){
  //       console.log('empty messages in the conversation details page', messages);
  //     }
  // }, [messages]);

  const createNewMessage = async (messageText) => {
    try {
      console.log('threadId in create messages', threadId);
      const message = {
        messageConversationId: threadId,
        text: messageText,
        user: {
          _id: user._id,
          name: user.name
        },
        _id: uuid()
      }
      console.log('full message before send', message);
      const createMessageResponse = await API.graphql(graphqlOperation(createMessage, { input: message } ));
      console.log('createMessageResponse response', createMessageResponse);
    } catch (error) {
      console.log('error creating message', error);
    }
  }

  const onSend = (newMessage) => {
    console.log('new message object', newMessage);
    console.log('new message text', newMessage[0].text);
    createNewMessage(newMessage[0].text);
  };
    
  return (
    !user ? 
                <View style={styles.container}>
                    <ActivityIndicator animating={true} color={Colors.red800} /> 
                </View>
                :
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: user._id,
      }}
    />
  );
};