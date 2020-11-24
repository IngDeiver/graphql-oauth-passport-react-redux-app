// import { COMMENT_ADDED, COMMENT_UPDATE , COMMENT_LOAD} from "../types/commentTypes";
import {commentReducer} from '../reducers/commentReducer'

// const commentAdded = (comment) => {
//     return {
//         type:COMMENT_ADDED,
//         payload:comment
//     }
// }

// const commentUpdate = (comment) => {

//     return {
//         type:COMMENT_UPDATE,
//         payload:comment
//     }
// }

// const commentLoad = (comments) => {
//     return {
//         type:COMMENT_LOAD,
//         payload:comments
//     }
// }


// export {
//     commentAdded,
//     commentUpdate,
//     commentLoad
// }

// this are new action create automatically with createSlice used name and name function in comment.reducer
export const {commentAdded, commentLoad, commentUpdate, commentRemove} = commentReducer.actions