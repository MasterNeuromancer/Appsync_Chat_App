import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useLazyQuery, gql } from '@apollo/client';
import { getUserAndConversationsData } from '../graphql/queries';

export const useUserConversationData = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userConversationData, setUserConversationData] = useState(null);
    const [getUserConversationsData, {data: userConversationsQueryResult}] = useLazyQuery(gql(getUserAndConversationsData), {variables: { name: authUser }});

    const checkAuthForUser = async () => {
        const authResponse = await Auth.currentAuthenticatedUser();
        const cognitoAttributesEmail = authResponse.username;
        setAuthUser(cognitoAttributesEmail);
    };

    useEffect(() => {
        checkAuthForUser();
    }, [checkAuthForUser]);

    useEffect(() => {
        if (authUser) {
            getUserConversationsData();
        }
    }, [authUser]);

    useEffect(() => {
        if (userConversationsQueryResult) {
            console.log('userConversationsQueryResult =====> ', userConversationsQueryResult);
            setUserConversationData(userConversationsQueryResult.getUserData.conversations.items);
        }
    }, [userConversationsQueryResult]);

    return userConversationData;
};
