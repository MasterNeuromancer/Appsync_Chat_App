import { useEffect, useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { listUserDatas } from '../graphql/queries';

export const useUsersList = () => {
    const [userList, setUserList] = useState(null);
    const [getUsersListData, {data: usersListDataResult}] = useLazyQuery(gql(listUserDatas), {variables: {limit: 10000}});

    useEffect(() => {
        getUsersListData();
    }, []);

    useEffect(() => {
        if (usersListDataResult) {
            setUserList(usersListDataResult.listUserDatas.items);
        }
    }, [usersListDataResult]);

    return userList;
};
