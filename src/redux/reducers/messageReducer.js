import {MESSAGE_THROW, CLEAR_MESSAGE} from '../types/messageType'

const initialState = {}
export default (state = initialState, {type, payload}) => {
    switch(type){
        case MESSAGE_THROW : {
            return {
                ...payload
            }
        }
        case CLEAR_MESSAGE : {
            return {
                
            }
        }
        default:
            return state
    }
}