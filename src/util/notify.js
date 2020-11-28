import {  toast } from 'react-toastify';
import {clearMessageAction} from '../redux/actions/messageAction' 

const Notify =  ({ message, type }, dispatch) => {
    toast(message, {
        hideProgressBar: true,
        type
    })
    dispatch(clearMessageAction())
};

export default Notify