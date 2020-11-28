import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client';
import ls from '../../util/secureLS'

export const loginThunk = createAsyncThunk("user/loginUser", async ({ user, apolloClient }) => {
    const LOGIN = gql`
        query login($username: String!, $password: String!){
            login(username: $username, password: $password){
                  username
                  acces_token
                  avatar
                }
        }`;
    const response = await apolloClient.query({
        query: LOGIN,
        variables: {
            username: user.username,
            password: user.password
        }
    })
    return response.data.login
})

export const registerThunk = createAsyncThunk("user/registerUser", async ({ user, apolloClient }) => {
    const REGSITER = gql`
        query register($user: InputUser!){
            register(user: $user){
                  username
                  acces_token
                  avatar
                }
        }`;
    const response = await apolloClient.query({
        query: REGSITER,
        variables: {
            user: {
                username: user.username,
                password: user.password
            }
        }
    })
    return response.data.register
})

export const logoutThunk = createAsyncThunk("user/logoutUser", async () => {
    await ls.removeAll()
    return true
})

export const fetchUserThunk = createAsyncThunk("user/fecthUser", async () => {
    const AUTH_UUID = await ls.get(process.env.REACT_APP_SESSION_KEY) // Get UUID value
    if (!AUTH_UUID) return null
    const user = await ls.get(AUTH_UUID) // Get user with UUID respective
    if (!user) return null
    return user
})