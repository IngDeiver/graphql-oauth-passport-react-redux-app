import React from 'react'

import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";

import Comments from "./pages/comments"
import Home from "./pages/home/home"
import Header from "./components/header/header"
import Login from "./pages/login"

// import store from './redux/store'
// import {commentAdded} from './redux/actions/commentActions'

// console.log('Initial state: ', store.getState())
//     const unsubscribe = store.subscribe(() =>
//         console.log('State after dispatch: ', store.getState())
//     )
// store.dispatch(commentAdded({_id:"id", content:"Comment Added", owner:{username:"Fake username added"}}))

export default () => {
    return (
        <Router>
            <Route path="/" render={(props) => (props.location.pathname !== "/login") && <Header />} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/comments" component={Comments} />
        </Router>
    )
}