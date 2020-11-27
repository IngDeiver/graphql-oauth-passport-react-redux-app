import {  toast } from 'react-toastify';
import {clearMessageAction} from '../redux/actions/messageAction' 

export default ({ message, type }, dispatch) => {
    toast(message, {
        hideProgressBar: true,
        type
    })
    dispatch(clearMessageAction())
};
