import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import {ApolloClient} from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from '../../aws-exports';

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const auth = {
    type: config.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).getIdToken.jwtToken
};

const httpLink = createHttpLink({ uri: url });

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink(url, httpLink),
]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
