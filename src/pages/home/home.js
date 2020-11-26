import React from 'react'
import Comment from '../../components/comment'
import { useForm } from '../../hocks/useForm'
import { Link } from 'react-router-dom'
import './home.modules.css'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { saveCommentThunk } from '../../redux/thunks/commentThunks'
import { useApolloClient } from '@apollo/client';
import { unwrapResult } from '@reduxjs/toolkit'
import messageAction from '../../redux/actions/messageAction'

export default () => {
    console.log("Render Home.js");
    const apolloClient = useApolloClient()

    const dispatch = useDispatch()

    const initialValues = {
        content: ""
    }
    const form = useForm({ initialValues })

    // selector function
    const selectCommentsIds = state => state.comments.map(comment => comment._id)
    const commentsIds = useSelector(selectCommentsIds, shallowEqual)

    const user = useSelector(state => state.user, shallowEqual)


    const addComment = async () => {
        dispatch(saveCommentThunk({ content: form.fields.content, apolloClient }))
            .then(unwrapResult)
            .then(res => form.setValueToField('content', ''))
            .catch(err => dispatch(messageAction({ message: `Post error: ${err.message}`, type: "error" })))
    }

    return (
        <div className="container-fluid  mb-3" style={{ marginTop: "100px" }}>
            <div className="d-flex flex-column flex-md-row position-relative">
                <div className="comment-input col-12 col-md-4">
                    <h3 className="text-center text-muted mb-2">
                        Welcome! Username
                                </h3>
                    <p className="text-muted text-center my-3">
                        Comment on what you think about this OAuth 2.0 implementation.
                        You can trust that your data will not be used for any other purpose than
                        to authenticate you on this website.
                                </p>
                    {user.username && (
                        <div className="my-2">
                            <textarea rows="4" cols="50" className="form-control my-2"
                                {...form.getInput('content')}>
                                Write a comment..
                        </textarea>
                            <button disabled={form.fields.content === ""}
                                onClick={addComment}
                                className="btn btn-block btn-success">
                                Publish
                        </button>
                        </div>
                    )}
                    <div className="text-center mb-4">
                        <Link to="/login">
                            Login to publish
                        </Link>
                    </div>
                </div>
                <div className="comment-list col-12 col-md-8">
                    <div className=" mx-3" >
                        {commentsIds.length == 0 && <p className="text-center mx-5 my-5">
                            No comments, be the first to post something!
                        </p>}
                        {commentsIds.map((commentId, i) => <Comment key={i} commentId={commentId} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}