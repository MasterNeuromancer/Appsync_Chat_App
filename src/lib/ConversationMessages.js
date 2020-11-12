import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getConversation } from '../graphql/queries';

const useConversationMessages = (threadId) => {
    console.log('threadId passed to messages function', threadId);
    const [conversationMessages, setConversationMessages] = useState([]);
    
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function fetchConversationMessages(threadId) {
            try {
                setLoading(true);
                console.log('threadId in the messages hook', threadId);
                const getConversationResponse = await API.graphql(graphqlOperation(getConversation, { id: threadId } ));
                console.log('getConversation response', getConversationResponse);
                const messages = getConversationResponse.data.getConversation.messages.items;
                console.log('messages in the hook', messages);
                if (messages) {
                    setConversationMessages(messages);
                    setLoading(false);
                }
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }

        if (threadId) {
            fetchConversationMessages(threadId);
        }
    }, [threadId]);

    return conversationMessages;
};

export default useConversationMessages;