import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import logo from './logo.png';
import { logoutThunk } from '../../redux/thunks/userThunks'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import {throwMessageAction} from '../../redux/actions/messageAction'



const Header = () => {

    // declare hocks
    let location = useLocation();
    const dispatch = useDispatch()
    const history = useHistory()

    // get data from state
    const user = useSelector(state => state.user, shallowEqual)
    


    // methods
    const logout = () => {
        dispatch(logoutThunk())
            .then(unwrapResult)
            .then(res => {
                dispatch(throwMessageAction({ message: "Logout success", type: "info" }))
                history.push("/login")
            })
            .catch(err => dispatch(throwMessageAction({ message: "Logout error", type: "error" })))
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="60" height="40" alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${location.pathname === "/" ? 'active' : ''}`}>
                            <Link className="nav-link" to="/">Home </Link>
                        </li>
                        {user.username && (<li className={`nav-item ${location.pathname === "/comments" ? 'active' : ''}`}>
                            <Link className="nav-link" to="/comments">Comments</Link>
                        </li>)}
                    </ul>
                    {user.username && (<form className="form-inline my-2 my-lg-0">
                        <img src={user.avatar ? user.avatar : "https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"}
                            alt="Avatar" width="40" height="40" style={{ borderRadius: "50%" }} className="img-fluid " />

                        <div className="dropdown mr-3">
                            <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mx-3">{user.username}</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button onClick={logout} className="dropdown-item">Logout</button>
                            </div>
                        </div>

                    </form>)}
                </div>
            </nav>
        </>
    )
}
export default Header