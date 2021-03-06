import {throwMessageAction} from '../redux/actions/messageAction'
import { userLogin } from '../redux/actions/userActions'
import ls from '../util/secureLS'
import { v4 as uuidv4 } from 'uuid';
import { encode } from 'base-64';

export  const createLocalAuth = async (provider, user, history, dispatch) => {
    try {
        user.provider = provider

        const AUTH_UUID = uuidv4() // Generate UUID for auth
        const AUTH_UUID_BASE64 = encode(AUTH_UUID) // Encode UUID
        ls.set(process.env.REACT_APP_SESSION_KEY, AUTH_UUID_BASE64) // Save UUID
        ls.set([AUTH_UUID_BASE64], user) // Save user auth with key of UUID
        
        dispatch(userLogin(user))
        dispatch(throwMessageAction({ message: `Welcome  ${user.username}`, type: "info" }))
        history.push("/")
        
    } catch (err) {
        dispatch(throwMessageAction({ message: `Auth eror: ${err.message}`, type: "error" }))
    }
}