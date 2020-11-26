import messageAction from '../redux/actions/messageAction'
import { userLogin } from '../redux/actions/userActions'

export  const createLocalAuth = async (provider, user, history, dispatch) => {
    try {
        user.provider = provider
        const userAuth = JSON.stringify(user)
        await localStorage.setItem("user", userAuth)
        dispatch(userLogin(user))
        history.push("/")
        dispatch(messageAction({ message: `Welcome  ${user.username}`, type: "info" }))
    } catch (err) {
        dispatch(messageAction({ message: `Auth eror: ${err.message}`, type: "error" }))
    }
}