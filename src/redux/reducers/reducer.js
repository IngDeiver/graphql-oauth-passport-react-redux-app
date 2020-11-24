import {combineReducers} from 'redux'

//coposition reducer 
import comments from './commentReducer'
import user from './userReducer'
import error from './errorReducer'

export default combineReducers({
    user,
    comments,
    error
})