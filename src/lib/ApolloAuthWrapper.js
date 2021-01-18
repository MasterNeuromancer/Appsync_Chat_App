import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

import RootNavigator from '../Components/RootNavigator';

const ApolloAuthWrapper = () => {
    const [userToken, setUserToken] = useState('');

    const token = async () => {
        const tokenResponse = await Auth.currentSession();
        console.log('token response', tokenResponse.accessToken.jwtToken);
        setUserToken(tokenResponse.accessToken.jwtToken);
    };

    useEffect(() => {
        token();
    }, []);

    
    return (
        <RootNavigator token={userToken}/>
    );
};

export default ApolloAuthWrapper;