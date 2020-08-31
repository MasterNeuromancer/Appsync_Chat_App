import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

export const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const [createUserData, setCreateUserData] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(null);

    const checkAuthForUser = () => {
        const authResponse = Auth.user.username;
        
        if(authResponse){
            setAuthUser(authResponse);
        } 
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
                    setUserData('no user found');
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