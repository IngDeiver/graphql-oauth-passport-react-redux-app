import { createSlice } from '@reduxjs/toolkit'
import {loginThunk, fetchUserThunk, logoutThunk} from '../thunks/userThunks'


const initialState = {}
export const userReducer = createSlice({
    name:"user",
    initialState,
    reducers:{
            userLogin(state, action) {
                return {
                    ...action.payload
                }
            }
    },
    extraReducers: builder => {
        builder
        .addCase(loginThunk.fulfilled, (state, action) => {
            console.log("Login user:", action);
            return {
                ...action.payload
            } 
        })
        .addCase(logoutThunk.fulfilled, (state, action) => {
            console.log("Logout user:", action);
            return {
               
            } 
        })
        .addCase(fetchUserThunk.fulfilled, (state, action) => {
            return {
                ...action.payload
            } 
        })
        .addCase(fetchUserThunk.rejected, (state, action) => {
            console.log("Failed to load session:",action)
            return {
                
            } 
        })
    }
})

export default userReducer.reducer