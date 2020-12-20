import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import styles from '../lib/Styles';
import { GiftedChat } from 'react-native-gifted-chat';
import { API, graphqlOperation } from 'aws-amplify';
import uuid from 'uuid-random';
import { createMessage } from '../graphql/mutations';
import { useUserData } from '../lib/User';
import useConversationMessages from '../lib/ConversationMessages';

export default  ({ id }) => {
  const user =  useUserData();
  const messages = useConversationMessages(id);

  const createNewMessage = async (messageText) => {
    try {
      const message = {
        messageConversationId: id,
        text: messageText,
        user: {
          _id: user._id,
          name: user.name
        },
        _id: uuid()
      }
      await API.graphql(graphqlOperation(createMessage, { input: message } ));
    } catch (error) {
      console.log('error creating message', error);
    }
  }

  const onSend = (newMessage) => {
    createNewMessage(newMessage[0].text);
  };
    
  return (
    !user 
      ? 
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
