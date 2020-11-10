import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserAndConversationsData } from '../graphql/queries';

export const useUserConversationData = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userConversationData, setUserConversationData] = useState(null);
    
    const [loading, setLoading] = useState(null);

    const checkAuthForUser = async () => {
        const authResponse = await Auth.currentAuthenticatedUser();
        const cognitoAttributesEmail = authResponse.username;
        setAuthUser(cognitoAttributesEmail);
    };

    useEffect(() => {
        checkAuthForUser();
    }, [checkAuthForUser]);

    useEffect(() => {
        async function fetchUserConversationData(authUser) {
            try {
                setLoading(true);
                const userConversationsResponse = await API.graphql(graphqlOperation(getUserAndConversationsData, { username: authUser } ));
                setLoading(false);
                console.log('user and conversations', userConversationsResponse);
                const userConversations = userConversationsResponse.data.getUserData.conversations.items;
                if (userConversations !== null) {
                    setUserConversationData(userConversations);
                    setLoading(false);
                } 
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }

        if (authUser) {
            fetchUserConversationData(authUser);
        }
    }, [authUser]);

    return userConversationData;
};
