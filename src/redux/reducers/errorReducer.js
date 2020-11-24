import ERROR_THROW from '../types/erroType'

const initialState = {error: null}
export default (state = initialState, {type, payload}) => {
    switch(type){
        case ERROR_THROW : {
            console.log("Global error: ", payload);
            return {
                ...state,
                error: payload
            }
        }
        default:
            return state
    }
}