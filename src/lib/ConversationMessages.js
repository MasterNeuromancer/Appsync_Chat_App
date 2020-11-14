import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getConversation } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

const useConversationMessages = (threadId) => {
    console.log('threadId passed to messages function', threadId);
    const [conversationMessages, setConversationMessages] = useState([]);
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    
    const [loading, setLoading] = useState(null);

    async function fetchConversationMessages(threadId) {
        try {
            // setLoading(true);
            console.log('threadId in the messages hook', threadId);
            const getConversationResponse = await API.graphql(graphqlOperation(getConversation, { id: threadId } ));
            console.log('getConversation response', getConversationResponse);
            const messages = getConversationResponse.data.getConversation.messages.items;
            console.log('messages in the hook', messages);
            if (messages) {
                setConversationMessages(messages);
                // setLoading(false);
            }
        } catch (error) {
            console.log('error', error);
            // setLoading(false);
        }
    }

    useEffect(() => {
        if (threadId || triggerRefresh) {
            setTriggerRefresh(false);
            fetchConversationMessages(threadId);
        }
    }, [threadId, triggerRefresh]);

    const subscribeMessages = async () => {
        await API.graphql(graphqlOperation(onCreateMessage, { messageConversationId: threadId })).subscribe({
          next: newMessage => {
            console.log('newMessage being sent', newMessage);
            fetchConversationMessages(threadId);
            // setTriggerRefresh(true);
            // setConversationMessages(conversationMessages => [
            //     ...conversationMessages,
            //     newMessage.value.data.onCreateMessage
            // ]);
          }
        });
    };

    subscribeMessages();

    return conversationMessages;
};

export default useConversationMessages;