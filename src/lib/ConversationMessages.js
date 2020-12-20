import { useState, useEffect } from 'react';
import { useLazyQuery, gql, useSubscription } from '@apollo/client';
import { getConversation } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';


const useConversationMessages = (threadId) => {
  const [messages, setMessages] = useState([]);
  const [getConversationData, {data: conversationQueryResults}] = useLazyQuery(gql(getConversation), {variables: {id: threadId}});
  const {data: onNewMessage} = useSubscription(gql(onCreateMessage), {variables: {messageConversationId: threadId}}); 

  useEffect(() => {
    if (threadId) {
      getConversationData();
    }
  }, [threadId]);

  useEffect(() => {
    if (conversationQueryResults) {
      setMessages(conversationQueryResults.getConversation.messages.items);
    }
  }, [conversationQueryResults]);

  useEffect(() => {
    if (onNewMessage) {
      const delta = onNewMessage.onCreateMessage;
      messages.forEach(x => {
        if (x.id !== delta.id);
        setMessages([delta, ...messages,]);
      });
    }
  }, [onNewMessage]);

  return messages;
};

export default useConversationMessages;