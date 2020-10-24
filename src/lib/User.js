import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUserData } from '../graphql/queries';
import { createUserData } from '../graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

export const useUserData = () => {
    const [userData, setUserData] = useState(null);
    // const [userEmail, setUserEmail] = useState(null);
    // const [createUserData, setCreateUserData] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(null);

    const checkAuthForUser = async () => {
        const authResponse = await Auth.currentAuthenticatedUser();
        // console.log('authResponse to check attributes ====>', authResponse.attributes);
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
                console.log('user userResponse in hook ======>', userResponse);
                setLoading(false);
                const user = userResponse.data.getUserData;
                if (user !== null) {
                    console.log('user data in try catch, hook block, succesfully fetch ================>', user);
                    setUserData(user);
                    setLoading(false);
                } else {
                    console.log('authUser before creating', authUser);
                    // const createUserResponse = await API.graphql(graphqlOperation(createUserData, { input: { username: authUser } } ));
                    // console.log('creating user in appsync response ====> ', createUserResponse);
                    // setUserData(createUserResponse.data.createUserData); 
                    setLoading(false);
                }
            } catch (error) {
                console.log('error', error);
                if(error.data){
                    console.log('setting user data in user hook and app state using the ERROR. Still needs to be looked into. \nThis is still broken and must not be ignored. THIS IS TECH DEBT!!!1');
                    console.log('error data to be passed to profile and home screen', error.data.getUserData);
                    setUserData(error.data.getUserData);
                }
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