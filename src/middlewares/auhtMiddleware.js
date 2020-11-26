import React from "react";
import { Route, Link } from "react-router-dom";


const checkLocalAuth = (props, user, Component) => {
    if (!user.username) {
        return (
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
    return <Component {...props} />
}

const ProtectedRoute = ({ component, user, ...rest }) =>
    (<Route {...rest} render={props => checkLocalAuth(props, user, component)} />);


export default ProtectedRoute