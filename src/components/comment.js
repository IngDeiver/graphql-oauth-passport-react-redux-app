import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../hocks/useForm'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useApolloClient } from '@apollo/client';
import { removeCommentThunk, updateCommentThunk } from '../redux/thunks/commentThunks'
import { unwrapResult } from '@reduxjs/toolkit'
import { throwMessageAction } from '../redux/actions/messageAction'



const selectCommentById = (state, commentId) => {
    return state.comments.find(comment => comment._id === commentId)
}

const Comment = React.memo(({ commentId }) => {
    // declare hocks
    const apolloClient = useApolloClient()
    const dispatch = useDispatch()

    // get data from state
    const comment = useSelector(state => selectCommentById(state, commentId))
    const user = useSelector(state => state.user, shallowEqual)
    const [isUpdating, setUpdating] = useState(false)

    // form
    const initialValues = {
        content: comment.content
    }
    const form = useForm({ initialValues })

    // methods
    const updateComment = () => {
        dispatch(updateCommentThunk({ commentId: commentId, content: form.fields.content, apolloClient }))
            .then(unwrapResult)
            .then(res => {
                dispatch(throwMessageAction({ message: `Comment update`, type: "info" }))
                setUpdating(false)
            })
            .catch(err => dispatch(throwMessageAction({ message: `Update error: ${err.message}`, type: "error" })))
    }

    const cancelUpdateComment = () => {
        if (form.fields.content !== comment.content) {
            form.setValueToField('content', comment.content)
        }
        setUpdating(false)
    }

    const removeComment = () => {
        dispatch(removeCommentThunk({ commentId: commentId, apolloClient }))
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
                                    <img alt="Avatar of athor" className="shadow" width="100px" height="100px" style={{ borderRadius: "50%" }} src={comment.owner.avatar ? comment.owner.avatar : "https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg"} />
                                </div>
                            </div>
                            <div className="col-lg-10 my-2">
                                <div className="d-flex justify-content-center justify-content-lg-start">
                                    <h4 >{comment.owner.username}</h4>
                                </div>
                                {isUpdating ?
                                    <textarea rows="4" cols="50" className="form-control"
                                    {...form.getInput('content')}>
                                    </textarea> :
                                    <p> {comment.content}</p>}
                            </div>
                        </div>
                    </div>
                    {user.username === comment.owner.username && (
                        <div className="card-footer">
                            <div className="d-flex flex-row-reverse">
                                {!isUpdating && (
                                    <div>
                                         <button className="btn btn-warning"
                                            onClick={() => setUpdating(true)}>
                                            <FontAwesomeIcon icon={faEdit} color="white" />
                                        </button>
                                        <button className="btn btn-danger ml-3"
                                            onClick={removeComment}>
                                            <FontAwesomeIcon icon={faTrashAlt} color="white" />
                                        </button>
                                    </div>
                                )}
                                {isUpdating &&
                                    <div>
                                        <button className="btn btn-default mr-3"
                                            onClick={updateComment}
                                            disabled={comment.content === form.fields.content}>
                                            Save
                                        </button>
                                        <button className="btn btn-default"
                                            onClick={cancelUpdateComment}>
                                            Cancel
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

export default Comment