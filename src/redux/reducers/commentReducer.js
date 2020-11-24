// import { COMMENT_ADDED, COMMENT_UPDATE, COMMENT_LOAD } from "../types/commentTypes";
import { createSlice } from '@reduxjs/toolkit'
import {fetchCommentsThunk} from '../../services/commentService'


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
    name:"comment" ,
    initialState,
    reducers:{
        // is action type
        commentAdded(state, action){
            // Now acept mutation with create slice beaces create slice used Immer
            state.push(action.payload)
        },
        // Prepare acept add multiple params then join in paylod
        commentUpdate:{
            reducer(state, action){
                console.log("Redcur with prepare: ", action);
                const comment = state.find(comment => comment._id == action.payload.commentId)
                comment.content = action.payload.content
            },
            prepare(commentId, content){
                return{
                    payload: {commentId, content}
                }
            }
        },
        commentRemove(state, action){
            state = state.filter(comment => comment._id !== action.payload._id)
        },
         /*Without extraReducers option and manual thunk function
        commentLoad(state, action){
            return action.payload
        },*/
    },
     /*extraReducers use a thunk function created with createAsyncThunk  and listen the nex actions
     prexi/action.pending
     prexi/action.fulfilled
     prexi/action.rejected*/
    extraReducers: builder => {
        builder.addCase(fetchCommentsThunk.pending, (state, action) => {
            // logic for show loading 
        })
        .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
            // logic for when succes request
            console.log("fulfilled in load comments with")
            return action.payload
        })
        .addCase(fetchCommentsThunk.rejected, (state, action) => {
            // logic for when fail request
            console.log("Error in load comments with createAsyncThunk: ", action.payload)
        })
    }
})

export default commentReducer.reducer