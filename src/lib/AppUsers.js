import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listUserDatas } from '../graphql/queries';

export const useUsersList = () => {
    const [userList, setUserList] = useState(null);
    
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        async function fetchUserList(authUser) {
            try {
                setLoading(true);
                const userListResponse = await API.graphql(graphqlOperation(listUserDatas, {limit: 10000}));
                console.log('user list response', userListResponse);
                setLoading(false);
                const userList = userListResponse.data.listUserDatas.items;
                console.log('loggin user list', userList);
                if (userList !== null) {
                    setUserList(userList);
                    setLoading(false);
                } 
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }

        fetchUserList();
    }, []);

    return userList;
};
