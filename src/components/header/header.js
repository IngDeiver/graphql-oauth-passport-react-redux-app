import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import logo from './logo.png';

export default () => {
    let match = useRouteMatch();
    console.log(match);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <Link className="navbar-brand" to="/">
              <img src={logo} width="60" height="40" alt="Logo"/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${match.url === "/" ? 'active':''}`}>
                        <Link className="nav-link" to="/">Home </Link>
                    </li>
                    <li className={`nav-item ${match.url === "/comments" ? 'active':''}`}>
                        <Link className="nav-link" to="/comments">Comments</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <img src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
                        alt="Avatar" width="50" height="50" className="img-thumbnail img-fluid " />

                    <div className="dropdown mr-3">
                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mx-3">Username</span>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link className="dropdown-item" to="/login"  >
                                Logout
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </nav>
    )
}