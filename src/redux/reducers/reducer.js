import {combineReducers} from 'redux'

//coposition reducer 
import comments from './commentReducer'
import user from './userReducer'
import message from './messageReducer'

export default combineReducers({
    user,
    comments,
    message
})