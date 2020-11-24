import ERROR_THROW from '../types/erroType'

export default (error) => (
    {
        type:ERROR_THROW,
        payload:error
    }
)