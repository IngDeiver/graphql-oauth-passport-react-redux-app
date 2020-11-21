import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png';

export default () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/">
              <img src={logo} width="60" height="40" alt="Logo"/>
            </Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link class="nav-link" to="/">Home </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/comments">Comments</Link>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <img src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
                        alt="Avatar" width="50" height="50" class="img-thumbnail img-fluid " />

                    <div class="dropdown mr-3">
                        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mx-3">Username</span>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link class="dropdown-item" to="/login"  >
                                Logout
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </nav>
    )
}