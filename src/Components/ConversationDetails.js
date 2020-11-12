import React, { useEffect } from 'react';
// import { View, Text, Button, SafeAreaView } from 'react-native';
// import styles from '../lib/Styles';
import {
    GiftedChat,
  } from 'react-native-gifted-chat';
import useConversationMessages from '../lib/ConversationMessages';

export default  ({ route }) => {
    const threadId = route.params.thread.conversation.id;
    console.log('navigation params', threadId);
    
    const messages = useConversationMessages(threadId);

    useEffect(() => {
        if(messages){
          console.log('empty messages in the conversation details page', messages);
        }
    }, [messages]);
    
    return (
        <GiftedChat
          messages={messages}
          onSend={() => console.log('sending a message!!')}
        //   user={{
        //     _id: 1,
        //   }}
        />
    );
};