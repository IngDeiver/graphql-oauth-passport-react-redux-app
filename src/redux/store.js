// import {createStore, applyMiddleware} from 'redux'
// import rootReducer from './reducers/reducer'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import commentReducer from './reducers/commentReducer'
import errorReducer from './reducers/errorReducer'
import userReducer from './reducers/userReducer'

// Can read from local store
// const preloadedState = {
//     comments:[],
//     user:{username:"Fake user", access_token:"token_string"}
// }

// const rootMiddleware = applyMiddleware(thunkMiddleware)

// const compositeEnhancer = composeWithDevTools (
//     rootMiddleware
// )

// export default createStore(rootReducer, preloadedState, compositeEnhancer)


/* with redux toolkit
configureStore added thunk, combine reducers and comoposited evTools and add more middlewares
for preent mutatios in state and etc
too install -> redux redux-thunk reselect*/
export default configureStore({
    reducer:{
        comments: commentReducer,
        user: userReducer,
        error:errorReducer
    }
})