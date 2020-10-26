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
                console.log('auth user in try catch', authUser);
                const userListResponse = await API.graphql(graphqlOperation(listUserDatas, {limit: 10000}));
                console.log('user userResponse in hook ======>', userListResponse);
                setLoading(false);
                const userList = userListResponse.data.listUserDatas.items;
                if (userList !== null) {
                    console.log('user data in try catch, hook block, succesfully fetch ================>', userList);
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
