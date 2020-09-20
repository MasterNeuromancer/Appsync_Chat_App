import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth, a } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

export const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [createUserData, setCreateUserData] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(null);

    const checkAuthForUser = async () => {
        const authResponse = await Auth.currentAuthenticatedUser();
        const cognitoUserName = Auth.user.username;
        console.log('cognito username ====>', cognitoUserName);
        console.log('auth response ======> ', authResponse);
        setAuthUser(authResponse.)
    };

    useEffect(() => {
        checkAuthForUser();
    }, [checkAuthForUser]);

    useEffect(() => {
        async function fetchUserData(authUser) {
            try {
                setLoading(true);
                console.log('auth user in try catch', authUser);
                const userResponse = await API.graphql(graphqlOperation(getUser, { id: authUser } ));
                console.log('user response in hook ======>', userResponse);
                const { user } = userResponse.data;
                if (!user) {
                    // create user
                    // const createUserResponse = await API.graphql(graphqlOperation(createUser, { id: authUser } ));
                    // console.log('creating user in appsync response ====> ', createUserResponse); 
                    setLoading(false);
                } else {
                    console.log('user data in try catch, hook block ================>', user);
                    setUserData(user);
                    setLoading(false);
                }
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }

        if (authUser) {
            console.log('got to auth user check this is it', authUser);
            fetchUserData(authUser);
        }
    }, [authUser]);

    return userData;
};