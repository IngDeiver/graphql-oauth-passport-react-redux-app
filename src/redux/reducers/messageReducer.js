import MESSAGE_THROW from '../types/messageType'

const initialState = {}
export default (state = initialState, {type, payload}) => {
    switch(type){
        case MESSAGE_THROW : {
            return {
                ...state,
                message: payload.message,
                type: payload.type
            }
        }
        default:
            return state
    }
}