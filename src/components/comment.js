import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../hocks/useForm'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useApolloClient } from '@apollo/client';
import {removeCommentThunk, updateCommentThunk} from '../redux/thunks/commentThunks'
import { unwrapResult } from '@reduxjs/toolkit'
import {throwMessageAction} from '../redux/actions/messageAction'
import $ from 'jquery'



const selectCommentById = (state, commentId) => {
    return state.comments.find(comment => comment._id === commentId)
}

export default React.memo(({ commentId }) => {

    console.log("Render Comment.js");
    // declare hocks
    const apolloClient = useApolloClient()
    const dispatch = useDispatch()

    // get data from state
    const comment = useSelector(state => selectCommentById(state, commentId))
    const user = useSelector(state => state.user, shallowEqual)
    
    // form
    const initialValues = {
        content: comment.content
    }
    const form = useForm({ initialValues })

    // methods
    const updateComment = () => {
        dispatch(updateCommentThunk({commentId:commentId, content: form.fields.content, apolloClient}))
        .then(unwrapResult)
        .then(res => {
            dispatch(throwMessageAction({ message: `Comment update`, type: "info" }))
            $("#editCommentModal").modal('hide')
        })
        .catch(err => dispatch(throwMessageAction({ message: `Update error: ${err.message}`, type: "error" })))
    }

    const cancelUpdateComment = () => {
        if(form.fields.content !== comment.content){
            form.setValueToField('content', comment.content)
        }
    }

    const removeComment = () => {
        dispatch(removeCommentThunk({commentId:commentId, apolloClient}))
        .then(unwrapResult)
        .then(res => dispatch(throwMessageAction({ message: `Comment removed`, type: "info" })))
        .catch(err => dispatch(throwMessageAction({ message: `Remove error: ${err.message}`, type: "error" })))
    }

   

    
    return (
        <div className="mb-5">
            <div style={{ borderRadius: "10px" }}>
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex flex-column  flex-lg-row">
                            <div className="col-lg-2 my-2 d-flex justify-content-center align-items-center mx-2">
                                <div>
                                    <img className="shadow" width="100px" height="100px" style={{ borderRadius: "50%" }} src={comment.owner.avatar ? comment.owner.avatar : "https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"} />
                                </div>
                            </div>
                            <div className="col-lg-10 my-2">
                                <div className="d-flex justify-content-center justify-content-lg-start">
                                    <h4 >{comment.owner.username}</h4>
                                </div>
                                <p style={{ textAlign: "justify" }}>
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    </div>
                    {user.username === comment.owner.username && (
                        <div className="card-footer">
                            <div className="d-flex flex-row-reverse">
                                <button className="btn btn-danger ml-3" 
                                onClick={removeComment}>
                                    <FontAwesomeIcon icon={faTrashAlt} color="white" />
                                </button>
                                <button className="btn btn-warning"
                                    onClick={() => console.log(comment)}
                                    data-toggle="modal" data-target="#editCommentModal">
                                    <FontAwesomeIcon icon={faEdit} color="white" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal  */}
            <div className="modal fade" id="editCommentModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit comment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <textarea rows="4" cols="50" className="form-control my-2"
                                {...form.getInput('content')}>
                            </textarea>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                onClick={cancelUpdateComment}>
                                Cancel
                            </button>
                            <button onClick={updateComment} type="button" className="btn btn-success"
                                disabled={form.fields.content === ""}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})