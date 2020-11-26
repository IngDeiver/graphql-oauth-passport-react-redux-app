import MESSAGE_THROW from '../types/messageType'

export default (error) => (
    {
        type:MESSAGE_THROW,
        payload:error
    }
)