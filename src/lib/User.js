import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import uuid from 'uuid-random';
import { getUserData } from '../graphql/queries';
import { createUserData } from '../graphql/mutations';

export const useUserData = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userData, setUserData] = useState(null);
    
    const [loading, setLoading] = useState(null);

    const checkAuthForUser = async () => {
        const authResponse = await Auth.currentAuthenticatedUser();
        console.log('authRESPONSE', authResponse.username);
        const cognitoAttributesEmail = authResponse.username;
        setAuthUser(cognitoAttributesEmail);
    };

    useEffect(() => {
        checkAuthForUser();
    }, [checkAuthForUser]);

    useEffect(() => {
        async function fetchUserData(authUser) {
            try {
                setLoading(true);
                console.log('authUser in the hook', authUser);
                const userResponse = await API.graphql(graphqlOperation(getUserData, { name: authUser } ));
                console.log('user response in user js', userResponse);
                const user = userResponse.data.getUserData;
                if (user !== null) {
                    setUserData(user);
                    setLoading(false);
                } else {
                    const createUserResponse = await API.graphql(graphqlOperation(createUserData, { input: { name: authUser, _id: uuid() } } ));
                    setUserData(createUserResponse.data.createUserData); 
                    setLoading(false);
                }
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }

        if (authUser) {
            fetchUserData(authUser);
        }
    }, [authUser]);

    return userData;
};
