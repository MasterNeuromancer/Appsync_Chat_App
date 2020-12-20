import { useState, useEffect } from 'react';
import {useLazyQuery, gql, useSubscription} from '@apollo/client';
import { getConversation } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';


const useConversationMessages = (threadId) => {
  const [messages, setMessages] = useState([]);
  const [GetConversation, {data: conversationQueryResults, refetch: refetchConversation}] = useLazyQuery(gql(getConversation), {variables: {id: threadId}});
  // const { data: newMessage } = useSubscription(gql(onCreateMessage));
  const {data: onNewMessage, loading, error} = useSubscription(gql(onCreateMessage), {variables: {messageConversationId: threadId}}); 
    
  console.log('onCreateMessage new message', onNewMessage);

  useEffect(() => {
    if (threadId) {
      console.log('thread id in conversation messages use effect', threadId);
      GetConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  useEffect(() => {
    if (conversationQueryResults) {
      console.log('conversationQueryResults in conversation details use effect', conversationQueryResults);
      setMessages(conversationQueryResults.getConversation.messages.items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationQueryResults]);

  useEffect(() => {
    if (onNewMessage || loading || error) {
      console.log('newMessage in conversation details use effect', onNewMessage);
      console.log('loading in conversation details use effect', loading);
      console.log('error in conversation details use effect', error);
      // refetchConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onNewMessage, loading, error]);

  return messages;
};

export default useConversationMessages;