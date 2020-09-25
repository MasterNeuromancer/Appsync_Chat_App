import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserData } from '../graphql/queries';
import { createUserData } from '../graphql/mutations';

export const useUserData = () => {
    const [userData, setUserData] = useState(null);
    // const [userEmail, setUserEmail] = useState(null);
    // const [createUserData, setCreateUserData] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(null);

    const checkAuthForUser = async () => {
        const authResponse = await Auth.currentAuthenticatedUser();
        const cognitoAttributesEmail = authResponse.attributes.email;
        console.log('cognito username ====>', cognitoAttributesEmail);
        setAuthUser(cognitoAttributesEmail);
        // setAuthUser(authResponse.)
    };

    useEffect(() => {
        checkAuthForUser();
    }, [checkAuthForUser]);

    useEffect(() => {
        async function fetchUserData(authUser) {
            try {
                setLoading(true);
                console.log('auth user in try catch', authUser);
                const userResponse = await API.graphql(graphqlOperation(getUserData, { username: authUser } ));
                console.log('user response in hook ======>', userResponse.data.getUserData);
                const user = userResponse.data.getUserData;
                if (user !== null) {
                    console.log('user data in try catch, hook block, succesfully fetch ================>', user);
                    setUserData(user);
                    setLoading(false);
                } else {
                    const createUserResponse = await API.graphql(graphqlOperation(createUserData, { username: authUser } ));
                    console.log('creating user in appsync response ====> ', createUserResponse.data.createUserData);
                    setUserData(createUserResponse.data.createUserData); 
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