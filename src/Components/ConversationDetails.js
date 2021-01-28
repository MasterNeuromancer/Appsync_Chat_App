import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, IconButton, Colors } from 'react-native-paper';
import styles from '../lib/Styles';
import { GiftedChat, Bubble, Send  } from 'react-native-gifted-chat';
import { API, graphqlOperation } from 'aws-amplify';
import uuid from 'uuid-random';
import { createMessage } from '../graphql/mutations';
import { useUserData } from '../lib/User';
import useConversationMessages from '../lib/ConversationMessages';

export default  ({ route }) => {
  console.log('route.params =====> ', route.params);
  const conversationId = route.params.conversationId;
  const conversationName = route.params.name;
  const user =  useUserData();
  const messages = useConversationMessages(conversationId);

  const createNewMessage = async (messageText) => {
    try {
      const message = {
        messageConversationId: conversationId,
        text: messageText,
        user: {
          _id: user._id,
          name: user.name
        },
        _id: uuid()
      }
      const sendingMessage = await API.graphql(graphqlOperation(createMessage, { input: message } ));
      console.log('sending message =====> ', sendingMessage);
    } catch (error) {
      console.log('error creating message', error);
    }
  }

  const onSend = (newMessage) => {
    createNewMessage(newMessage[0].text);
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#44bcd8'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#44bcd8'/>
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <View >
        <IconButton icon='chevron-double-down' size={36} color='#44bcd8'/>
      </View>
    );
  }
    
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
              showUserAvatar
              renderBubble={renderBubble}
              alwaysShowSend
              renderUsernameOnMessage
              renderSend={renderSend}
              scrollToBottom
              scrollToBottomComponent={scrollToBottomComponent}
            />
  );
};
