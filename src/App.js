import React from 'react'

import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import Comments from "./pages/comments"
import Home from "./pages/home/home"
import Header from "./components/header/header"
import Login from "./pages/login"
import { useDispatch, useSelector , shallowEqual} from "react-redux"
import Register from './pages/register'

import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './middlewares/auhtMiddleware'
import { unwrapResult } from '@reduxjs/toolkit'
import {throwMessageAction} from './redux/actions/messageAction'
import { fetchUserThunk } from './redux/thunks/userThunks'
import { fetchCommentsThunk } from './redux/thunks/commentThunks'
import { useApolloClient } from '@apollo/client'


// import store from './redux/store'
// import {commentAdded} from './redux/actions/commentActions'

// console.log('Initial state: ', store.getState())
//     const unsubscribe = store.subscribe(() =>
//         console.log('State after dispatch: ', store.getState())
//     )
// store.dispatch(commentAdded({_id:"id", content:"Comment Added", owner:{username:"Fake username added"}}))




export default () => {
    console.log("Render App.js");
    // declare hocks
    const dispatch = useDispatch()
    const apolloClient = useApolloClient()

    // load data
    dispatch(fetchUserThunk())
    .then(unwrapResult)
    .catch(err => dispatch(throwMessageAction({message:`Eror to load session: ${err.message}`, type:"error"})))

    dispatch(fetchCommentsThunk({ apolloClient }))
    .then(unwrapResult)
    .catch(err => dispatch(throwMessageAction({message:`Error to load data: ${err.message}`, type:"error"})))

    // get data from state
    const user = useSelector(state => state.user, shallowEqual)
    
    
    

    return (
        <Router>
            <Route path="/" render={(props) => (props.location.pathname !== "/login" && props.location.pathname !== "/signup") && <Header />} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <ProtectedRoute
              exact
              path="/comments"
              user={user}
              component={Comments}
            />
        </Router>
    )
}