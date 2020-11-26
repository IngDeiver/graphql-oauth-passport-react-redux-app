import MESSAGE_THROW from '../types/messageType'

const initialState = {}
export default (state = initialState, {type, payload}) => {
    switch(type){
        case MESSAGE_THROW : {
            return {
                ...payload
            }
        }
        default:
            return state
    }
}