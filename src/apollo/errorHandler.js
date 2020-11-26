import messageAction from '../redux/actions/messageAction'

export const INTERNAL_ERROR = "INTERNAL ERROR"
export const UNAUTHENTICATED = "UNAUTHENTICATED"

export default (dispatch, {graphQLErrors, networkError, message}) => {
    const  type = "error"
    if(graphQLErrors.length > 0){
        graphQLErrors.forEach(({extensions, message}) => {
            const prefixMessage = extensions.code === UNAUTHENTICATED ?  `${UNAUTHENTICATED}: ` :
            `${INTERNAL_ERROR}: `
            dispatch(messageAction({message: `${prefixMessage} ${message}`, type}))
        });
        return;
    }
    if (networkError) dispatch(messageAction({message:`Network error: ${message}`, type}))
}