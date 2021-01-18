import { useEffect, useState } from 'react';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { useLazyQuery, gql } from '@apollo/client';
import uuid from 'uuid-random';
import { getUserData } from '../graphql/queries';
import { createUserData } from '../graphql/mutations';

export const useUserData = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [getUserOwnData, {data: usersOwnDataQueryResult}] = useLazyQuery(gql(getUserData), {variables: { name: authUser }});

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
        if (usersOwnDataQueryResult) {
            setUserData(usersOwnDataQueryResult.getUserData);
        }
    }, [usersOwnDataQueryResult]);

    return userData;
};
