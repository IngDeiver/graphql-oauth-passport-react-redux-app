import { createAsyncThunk } from '@reduxjs/toolkit'
import { gql } from '@apollo/client';

export const loginThunk = createAsyncThunk("user/loginUser", async ({ user, apolloClient }) => {
    const LOGIN = gql`
        query login($username: String!, $password: String!){
            login(username: $username, password: $password){
                  username
                  acces_token
                }
        }`;
    const response = await apolloClient.query({
        query: LOGIN, 
        variables: {
            username: user.username,
            password: user.password
        }
    })
    console.log(response);
    return response.data.login
})

export const registerThunk = createAsyncThunk("user/registerUser", async ({ user, apolloClient }) => {
    const REGSITER = gql`
        query register($user: InputUser!){
            register(user: $user){
                  username
                  acces_token
                }
        }`;
    const response = await apolloClient.query({
        query: REGSITER, 
        variables: {
            user:{
                username: user.username,
                password: user.password
            }
        }
    })
    console.log(response);
    return response.data.register
})

export const logoutThunk = createAsyncThunk("user/logoutUser", async () => {
    await localStorage.removeItem("user")
    return true
})

export const fetchUserThunk = createAsyncThunk("user/fecthUser", async () => {
    const user = await localStorage.getItem("user")
    return JSON.parse(user)
})