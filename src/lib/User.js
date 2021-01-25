import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { useLazyQuery, gql } from '@apollo/client';
import uuid from 'uuid-random';
import { getUserData } from '../graphql/queries';
import { createUserData } from '../graphql/mutations';

export const useUserData = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [getUserOwnData, {data: usersOwnDataQueryResult, refetch: refetchUsersData}] = useLazyQuery(gql(getUserData), {variables: { name: authUser }});

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
            getUserOwnData();
        }
    }, [authUser]);

    useEffect(() => {
        async function createNewUserData() {
            console.log('creating new user ====> ', authUser);
            const createUserResponse = await API.graphql(graphqlOperation(createUserData, { input: { name: authUser, _id: uuid() } } ));
            if(createUserResponse.data.createUserData){
                refetchUsersData();
            };
        }

        if (usersOwnDataQueryResult) {
            console.log('usersOwnDataQueryResult', usersOwnDataQueryResult);
            if(usersOwnDataQueryResult.getUserData === null) {
                createNewUserData();
            } else {
                setUserData(usersOwnDataQueryResult.getUserData);
            }
        }
    }, [usersOwnDataQueryResult]);

    return userData;
};
