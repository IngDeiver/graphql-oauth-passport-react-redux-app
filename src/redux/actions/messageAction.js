import {MESSAGE_THROW, CLEAR_MESSAGE} from '../types/messageType'

const throwMessageAction = (error) => (
    {
        type:MESSAGE_THROW,
        payload:error
    }
)

const clearMessageAction = () => (
    {
        type:CLEAR_MESSAGE,
        payload:{}
    }
)

export {
    throwMessageAction,
    clearMessageAction
}