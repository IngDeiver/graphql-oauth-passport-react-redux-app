import React from 'react'

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from "react-router-dom";

import Comments from "./pages/comments"
import Home from "./pages/home/home"
import Header from "./components/header/header"
import Login from "./pages/login"
import { useSelector } from "react-redux"
import Register from './pages/register'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import store from './redux/store'
// import {commentAdded} from './redux/actions/commentActions'

// console.log('Initial state: ', store.getState())
//     const unsubscribe = store.subscribe(() =>
//         console.log('State after dispatch: ', store.getState())
//     )
// store.dispatch(commentAdded({_id:"id", content:"Comment Added", owner:{username:"Fake username added"}}))

const notify = ({ message, type }) => toast(message, {
    hideProgressBar: true,
    type
});

const getUser = async () => {
    const user = await localStorage.getItem("user")
    return user
}

const PrivateRoute = ({ children, ...rest }) => {
    let auth = getUser()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                        <div className="container" style={{ marginTop: "100px" }}>
                            <div className="card" >
                            <div className="card-body d-flex  flex-column jutify-content-center align-items-center">
                                <p className="text-center my-2">To see the content of this page log in</p>
                                <Link className="text-center my-2" to="/login">Login</Link>
                            </div>
                        </div>
                        </div>
                    )
            }
        />
    );
}

export default () => {
    console.log("Render App.js");
    const message = useSelector(state => state.message)
    if (message) notify(message)

    return (
        <Router>
            <Route path="/" render={(props) => (props.location.pathname !== "/login" && props.location.pathname !== "/signup") && <Header />} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <PrivateRoute exact path="/comments" >
                <Comments />
            </PrivateRoute>
            <ToastContainer position="bottom-center" />
        </Router>
    )
}