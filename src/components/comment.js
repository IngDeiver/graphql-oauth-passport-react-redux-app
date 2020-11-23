import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


export default ({ content }) => {

    return (
        <div className="mb-5">
            <div style={{ borderRadius: "10px" }}>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column  flex-lg-row">
                            <div className="col-lg-2 my-2 d-flex justify-content-center align-items-center mx-2">
                                <div>
                                    <img className="shadow" width="100px" height="100px" style={{ borderRadius: "50%" }} src="https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg" />
                                </div>
                            </div>
                            <div className="col-lg-10 my-2">
                                <div className="d-flex justify-content-center justify-content-lg-start">
                                    <h4 >Username</h4>
                                </div>
                                <p style={{ textAlign: "justify" }}>
                                    {content}
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis sapien 
                                    nunc. Maecenas libero tellus, ultricies et felis a, luctus ultricies nisi. 
                                    Morbi id condimentum elit. Ut ex augue, bibendum et mattis sed, iaculis at elit. 
                                    Ut porttitor nunc sapien, sit amet molestie quam consectetur quis. 
                                    
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-danger ml-3">
                                <FontAwesomeIcon icon={faTrashAlt} color="white" />
                            </button>
                            <button className="btn btn-warning"
                            data-toggle="modal" data-target="#exampleModal">
                                <FontAwesomeIcon icon={faEdit} color="white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal  */}
            <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit comment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}