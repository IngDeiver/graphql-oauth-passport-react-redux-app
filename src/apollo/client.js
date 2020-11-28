import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, from } from '@apollo/client';
import ls from '../util/secureLS'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => {
    const AUTH_UUID = ls.get(process.env.REACT_APP_SESSION_KEY) // Get UUID value
    if(!AUTH_UUID){
      return {
        headers: {
          ...headers
        }
      }
    }

    const user =  ls.get([AUTH_UUID]) // Get user with UUID respective
    if(!user){
      return {
        headers: {
          ...headers
        }
      }
    }

    const {accessToken, provider} = user
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
  