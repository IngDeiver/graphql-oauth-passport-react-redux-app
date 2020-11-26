import { ApolloClient, InMemoryCache } from '@apollo/client';
import uris from '../config/uris.json'

export default new ApolloClient({
    uri: uris["graphql-server"],
    cache: new InMemoryCache(),
  });
  