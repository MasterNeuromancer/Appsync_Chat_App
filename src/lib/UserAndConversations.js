import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserAndConversationsData } from '../graphql/queries';

export const useUserConversationData = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userConversationData, setUserConversationData] = useState(null);
    
    const [loading, setLoading] = useState(null);

    const checkAuthForUser = async () => {
        const authResponse = await Auth.currentAuthenticatedUser();
        // console.log('authResponse to check attributes ====>', authResponse.attributes);
        const cognitoAttributesEmail = authResponse.attributes.email;
        console.log('cognito username ====>', cognitoAttributesEmail);
        setAuthUser(cognitoAttributesEmail);
    };

    useEffect(() => {
        checkAuthForUser();
    }, [checkAuthForUser]);

    useEffect(() => {
        async function fetchUserConversationData(authUser) {
            try {
                setLoading(true);
                console.log('auth user in try catch', authUser);
                const userConversationsResponse = await API.graphql(graphqlOperation(getUserAndConversationsData, { username: authUser } ));
                console.log('user userResponse in hook ======>', userConversationsResponse);
                setLoading(false);
                const user = userConversationsResponse.data.getUserAndConversationsData;
                if (user !== null) {
                    console.log('user data in try catch, hook block, succesfully fetch ================>', user);
                    setUserConversationData(user);
                    setLoading(false);
                } 
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }

        if (authUser) {
            console.log('got to auth user check this is it', authUser);
            fetchUserConversationData(authUser);
        }
    }, [authUser]);

    return userConversationData;
};