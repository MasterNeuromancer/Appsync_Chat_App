import React from 'react';
import {ApolloProvider} from '@apollo/client';
import ConversationDetails from './ConversationDetails';
import { createAuthLink } from 'aws-appsync-auth-link';

import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import {ApolloClient} from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from '../../aws-exports';

export default  ({ route }) => {
    const userToken = route.params.token;
    const threadId = route.params.thread.conversation.id;
    const url = config.aws_appsync_graphqlEndpoint;
    const region = config.aws_appsync_region;
    const auth = {
        type: config.aws_appsync_authenticationType,
        jwtToken: userToken,
    };

    const httpLink = createHttpLink({ uri: url });

    const link = ApolloLink.from([
        createAuthLink({ url, region, auth }),
        createSubscriptionHandshakeLink(url, httpLink),
    ]);

    const client = new ApolloClient({
        link,
        cache: new InMemoryCache(),
    });

    
    return (
        <ApolloProvider client={client}>
            <ConversationDetails id={threadId}/>
        </ApolloProvider>
    );
};