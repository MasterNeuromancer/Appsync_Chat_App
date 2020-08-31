import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

export const useUserData = () => {
    // const [userData, setUserData] = useState(null);
    const [authUser, setAuthUser] = useState(null);

    const checkAuthForUser = () => {
        const authResponse = Auth.user.username;
        
        if(authResponse){
            setAuthUser(authResponse);
            console.log('authresponse in hook =====>', authResponse);
        } 
    };

    useEffect(() => {
        checkAuthForUser();
    }, [checkAuthForUser]);

    console.log('authUser in hook ', authUser);

    if (authUser) {
        return authUser;
    } else {
        return 'no user found';
    }
};