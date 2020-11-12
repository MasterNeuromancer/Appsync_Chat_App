import React, { useState, useEffect } from 'react';
// import { View, Text, Button, SafeAreaView } from 'react-native';
// import styles from '../lib/Styles';
import {
    GiftedChat,
  } from 'react-native-gifted-chat';
  import { API, graphqlOperation } from 'aws-amplify';
import { getConversation } from '../graphql/queries';
import useConversationMessages from '../lib/ConversationMessages';

export default  ({ route }) => {
    const threadId = route.params.thread.conversation.id;
    console.log('navigation params', threadId);
    const [messages, setMessages] = useState([]);
    
    // const messages = useConversationMessages(threadId);

    // useEffect(() => {
    //     if(messages){
    //       console.log('empty messages in the conversation details page', messages);
    //     }
    // }, [messages]);

    const onSend = (newMessage) => {
      console.log('new message object', newMessage);
      console.log('new message text', newMessage[0].text);
      setMessages(GiftedChat.append(messages, newMessage));
    };
    
    return (
        <GiftedChat
          messages={messages}
          onSend={onSend}
        //   user={{
        //     _id: 1,
        //   }}
        />
    );
};