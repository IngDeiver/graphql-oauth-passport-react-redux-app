import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Comments from "./pages/comments"
import Home from "./pages/home"
import Header from "./components/header/header"
import Login from "./pages/login"

export default () => {
    return (
        <Router>
            <Route path="/" render={ ( props ) => ( props.location.pathname !== "/login") && <Header /> }/>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/comments" component={Comments} />
        </Router>
    )
}