import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getConversation } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

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

    const subscribeMessages = async () => {
        await API.graphql(graphqlOperation(onCreateMessage, { messageConversationId: threadId })).subscribe({
          next: newMessage => {
            console.log('newMessage being sent', newMessage);
            // setGameItems(gameItems => [
            //   ...gameItems,
            //   [
            //     subonCreateGame.value.data.onCreateGame.id,
            //     subonCreateGame.value.data.onCreateGame.player1.name,
            //     subonCreateGame.value.data.onCreateGame.player2.name,
            //     subonCreateGame.value.data.onCreateGame.resultPlayer1.toString(),
            //     subonCreateGame.value.data.onCreateGame.resultPlayer2.toString()
            //   ]
            // ]);
          }
        });
    };

    return conversationMessages;
};

export default useConversationMessages;