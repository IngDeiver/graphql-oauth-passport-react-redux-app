import uris from '../config/uris.json'
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from '@apollo/client';

const httpLink = new HttpLink({ uri: uris["graphql-server"] });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    const {accessToken, provider} = JSON.parse(localStorage.getItem('user')) || {}
    return {
      headers: {
        ...headers,
        authorization: provider !== "google" && accessToken ? `Bearer ${accessToken}` : null,
        'access_token': provider === "google" && accessToken ? `${accessToken}`: null,
        provider: accessToken ? provider : null
      }
    }
  });

  return forward(operation);
})

export default new ApolloClient({
    cache: new InMemoryCache(),
    link: from([
      authMiddleware,
      httpLink
    ])
  });
  