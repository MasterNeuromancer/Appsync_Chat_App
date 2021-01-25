import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useLazyQuery, gql, useSubscription } from '@apollo/client';
import { getUserAndConversationsData } from '../graphql/queries';
import { onCreateConversationLink } from '../graphql/subscriptions';

export const useUserConversationData = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userConversationData, setUserConversationData] = useState([]);
    const [getUserConversationsData, {data: userConversationsQueryResult, refetch: refetchUserConversations}] = useLazyQuery(gql(getUserAndConversationsData), {variables: { name: authUser }});
    
    // Needs to have userId before subscription can be activated
    // const {data: onNewConversationLink} = useSubscription(gql(onCreateConversationLink), {variables: {conversationLinkUserId: userConversationsQueryResult.getUserData._id}}); 

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
            console.log('userConversationsQueryResult =====> ', userConversationsQueryResult.getUserData?.conversations?.items);
            setUserConversationData(userConversationsQueryResult.getUserData?.conversations?.items);
        }
    }, [userConversationsQueryResult]);

    // Missing userId for conversationLink subscription
    //
    // useEffect(() => {
    //     if (onNewConversationLink) {
    //         console.log('created newConversationLink', onCreateConversationLink);
    //         refetchUserConversations();
    //     }
    // }, [onNewConversationLink]);

    return userConversationData || [];
};
