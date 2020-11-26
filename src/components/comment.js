import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../hocks/useForm'
import {useSelector, useDispatch}  from 'react-redux'
import {commentUpdate} from '../redux/actions/commentActions'
import {useApolloClient} from '@apollo/client';



const selectCommentById = (state, commentId) => {
    return state.comments.find(comment => comment._id === commentId)
}

export default ({ commentId }) => {

    console.log("Render Comment.js");
    const apolloClient = useApolloClient()
    const dispatch = useDispatch()
    // get comment by id
    const comment = useSelector(state => selectCommentById(state, commentId))

    const initialValues = {
        content: comment.content
    }
    const form = useForm({ initialValues })

    const updateComment = () => {
        dispatch(commentUpdate(comment._id, form.fields.content))
    }

    const cancelUpdateComment = ()  => {
        form.setValueToField('content', comment.content)
    }

    useEffect(() =>{}, [comment])
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
                                    <h4 >{comment.owner.username}</h4>
                                </div>
                                <p style={{ textAlign: "justify" }}>
                                    {comment.content}
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
}