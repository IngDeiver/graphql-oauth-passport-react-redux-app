// import { COMMENT_ADDED, COMMENT_UPDATE, COMMENT_LOAD } from "../types/commentTypes";
import { createSlice } from '@reduxjs/toolkit'
import {
    fetchCommentsThunk, saveCommentThunk,
    removeCommentThunk, updateCommentThunk
}
    from '../../redux/thunks/commentThunks'


const initialState = []

/*export default function (state = initialState, { type, payload }) {

    switch (type) {
        case COMMENT_ADDED: {
            return [
                ...state,
                { ...payload }
            ]
        }

        case COMMENT_UPDATE: {
            let comments = state.map(comment => {
                if (comment._id !== payload._id) {
                    return comment
                }
                return { ...payload }
            })
            return comments
        }

        case COMMENT_LOAD: {
            return payload
        }


        default:
            return state
    }
}*/

// with redux tool kit
// now not is necesary create action becasue createSlice create the actions
export const commentReducer = createSlice({
    // is action type prefix
    name: "comment",
    initialState,
    reducers: {
        // is action type
        commentAdded(state, action) {
            // Now acept mutation with create slice beaces create slice used Immer
            state.push(action.payload)
        },
        // Prepare acept add multiple params then join in paylod
        /*commentUpdate:{
            reducer(state, action){
                const comment = state.find(comment => comment._id == action.payload.commentId)
                comment.content = action.payload.content
            },
            prepare(commentId, content){
                return{
                    payload: {commentId, content}
                }
            }
        },*/
        commentRemove(state, action) {
            state = state.filter(comment => comment._id !== action.payload._id)
        },
        /*Without extraReducers option and manual thunk function
       commentLoad(state, action){
           return action.payload
       },*/
    },
    /*extraReducers use a thunk function created with createAsyncThunk  and listen the nex actions
    prefix/action.pending
    prefix/action.fulfilled
    prefix/action.rejected*/
    extraReducers: builder => {
        builder
            .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
                // logic for when succes request
                return action.payload
            })
            .addCase(fetchCommentsThunk.rejected, (state, action) => {
                return []
            })
            .addCase(saveCommentThunk.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(removeCommentThunk.fulfilled, (state, action) => {
                const newState = state.filter(comment => comment._id !== action.payload._id)
                return newState
            })
            .addCase(updateCommentThunk.fulfilled, (state, action) => {
                const comment = state.find(comment => comment._id === action.payload._id)
                comment.content = action.payload.content
            })
    }
})

export default commentReducer.reducer