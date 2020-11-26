import React from 'react'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { useForm } from '../hocks/useForm'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import messageAction from '../redux/actions/messageAction'
import { useHistory } from "react-router-dom";
import { loginThunk } from '../redux/thunks/userThunks'
import { useApolloClient } from '@apollo/client';
import { unwrapResult } from '@reduxjs/toolkit'
import {createLocalAuth} from '../util/authUtil'

const initialValues = {
    username: "",
    password: ""
}

const { googleId, facebookId } = require("../config/oauthCredentials.json")

export default () => {
    const dispatch = useDispatch()
    const form = useForm({ initialValues })
    const history = useHistory();
    const apolloClient = useApolloClient()

   

    const responseFacebook = ({ accessToken, name, picture }) => {
        if (accessToken) createLocalAuth("facebook", { accessToken, username: name, avatar: picture.data.url },
        history, dispatch)
        else
            dispatch(messageAction({ message: `Facebook auth eror`, type: "error" }))
    }

    const successGoogle = async ({ accessToken, profileObj }) => {
        createLocalAuth("google", { accessToken, username: profileObj.name, avatar: profileObj.imageUrl },
        history, dispatch)
    }

    const failureGoogle = (err) => {
        dispatch(messageAction({ message: `Google auth eror: ${err}`, type: "error" }))
    }

    const loginWithUsernameAndPassword = () => {
        dispatch(loginThunk({
            user: { username: form.fields.username, password: form.fields.password },
            apolloClient
        }))
        .then(unwrapResult)
        .then(user =>  createLocalAuth("owner", { accessToken:user.accessToken, username: user.username, avatar: null },
        history, dispatch))
        .catch(err => dispatch(messageAction({ message: `Auth eror: ${err.message}`, type: "error" })))
    }

    return (
        <div className="container">
            <div className="card my-5">
                <div className="card-header">
                    <h1 className="card-title text-center">Login with OAuth </h1>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <input placeholder="User" className="form-control my-2"
                            {...form.getInput('username')} type="text" />
                        <input className="form-control my-2" placeholder="Password"
                            {...form.getInput('password')} type="password" />
                        <div className="d-flex">
                            <Link to="/">Home</Link>
                            <Link to="/signup" className="mx-2">Sign up</Link>
                        </div>

                        {/* Login buttons */}
                        <div className="my-2 d-flex flex-column justify-content-center align-items-center">
                            <button className="btn btn-success my-2 btn-block col-3"
                                onClick={loginWithUsernameAndPassword}
                                disabled={form.fields.username === "" || form.fields.password === ""}>
                                Login
                            </button>
                            <FacebookLogin
                                appId={facebookId}
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                icon="fa-facebook"
                                size="small" />
                            <GoogleLogin
                                className="mt-2"
                                clientId={googleId}
                                autoLoad={false}
                                onSuccess={successGoogle}
                                onFailure={failureGoogle}
                                cookiePolicy={'single_host_origin'}
                            />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}