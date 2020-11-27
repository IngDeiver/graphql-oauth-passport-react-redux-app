import React from 'react'
import { useForm } from '../hocks/useForm'
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux'
import { registerThunk } from '../redux/thunks/userThunks'
import { useApolloClient } from '@apollo/client';
import { unwrapResult } from '@reduxjs/toolkit'
import {createLocalAuth} from '../util/authUtil'
import {throwMessageAction} from '../redux/actions/messageAction'
import notify from '../util/notify'


export default () => {

    const initialValues = {
        username: "",
        password: ""
    }

    const dispatch = useDispatch()
    const form = useForm({ initialValues })
    const history = useHistory();
    const apolloClient = useApolloClient()

    // get data from state
    const message = useSelector(state => state.message)
    if (message.type) notify(message, dispatch)

    const register = () => {
        dispatch(registerThunk({
            user: { username: form.fields.username, password: form.fields.password },
            apolloClient
        }))
        .then(unwrapResult)
        .then(user =>  createLocalAuth("owner", { accessToken:user.acces_token, username: user.username, avatar: user.avatar },
        history, dispatch))
        .catch(err => dispatch(throwMessageAction({ message: `Auth eror: ${err.message}`, type: "error" })))
    }

    return (
        <div className="container">
            <div className="card my-5">
                <div className="card-header">
                    <h1 className="card-title text-center">Sign Up </h1>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <input placeholder="User" className="form-control my-2"
                            {...form.getInput('username')} type="text" />
                        <input className="form-control my-2" placeholder="Password"
                            {...form.getInput('password')} type="password" />
                        <div className="d-flex">
                            <Link to="/">Home</Link>
                            <Link to="/login" className="mx-2">Login</Link>
                        </div>

                        {/* Login button */}
                        <div className="my-2 d-flex flex-column justify-content-center align-items-center">
                            <button className="btn btn-success my-2 btn-block col-3"
                            onClick={register}
                                disabled={form.fields.username === "" || form.fields.password === ""}>
                                Sing Up
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}