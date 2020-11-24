import {commentLoad, commentAdded} from '../redux/actions/commentActions'
import ErrorAction from '../redux/actions/errorAction'
import { createAsyncThunk } from '@reduxjs/toolkit'

/*export const fetchCommentsThunk = (dispatch, getState) => {
    try {
        setTimeout(()=>{
            dispatch(commentLoad([{_id:"id_string", content:"Fake comment", owner:{username:"Fake user"}},
            {_id:"id_string2", content:"Fake comment2", owner:{username:"Fake user2"}}]));
        }, 2000)
    }catch(err){
        dispatch(ErrorAction(err))
    }
}*/

/* with createAsyncThunk
The payloadCreator function will be called with two arguments:
arg: a single value, containing the first parameter that was passed to the thunk action creator when
 it was dispatched. This is useful for passing in values like item IDs that may be needed as part of 
 the request. If you need to pass in multiple values, pass them together in an object when you dispatch 
 the thunk, like dispatch(fetchUsers({status: 'active', sortBy: 'name'})).
thunkAPI: an object containing all of the parameters that are normally passed to a Redux thunk function,
 as well as additional options:
dispatch: the Redux store dispatch method
getState: the Redux store getState method
extra: the "extra argument" given to the thunk middleware on setup, if available
requestId: a unique string ID value that was automatically generated to identify this request sequence
signal: an AbortController.signal object that may be used to see if another part of the app logic has 
marked this request as needing cancelation.
rejectWithValue: rejectWithValue is a utility function that you can return in your action creator to 
return a rejected response with a defined payload. It will pass whatever value you give it and return 
it in the payload of the rejected action.*/
export const fetchCommentsThunk = createAsyncThunk("comment/fecthComments", async (data=null, {dispatch, rejectWithValue}) => {
    console.log("Escuting fetchCommentsThunk");
    try {
        const feik = await localStorage.getItem("feik")
        return [{_id:"id_string", content:"Fake comment", owner:{username:"Fake user"}},
                {_id:"id_string2", content:"Fake comment2", owner:{username:"Fake user2"}}]

    }catch(err){
        dispatch(ErrorAction(err.message))
        return rejectWithValue({message: err.message,
                                code:err.code,
                                stack:err.stack})
    }
})




export const saveComment  = (content) => {
    return function saveCommentThunk (dispatch, getState)  {
        try {
            setTimeout(()=>{
                dispatch(commentAdded({_id:"id_string_add", content, owner:{username:"Fake user added"}}));
            }, 1000)
        }catch(err){
            dispatch(ErrorAction(err))
        }
       
    }
}