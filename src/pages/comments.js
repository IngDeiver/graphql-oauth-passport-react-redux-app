import React from 'react'
import {useSelector, shallowEqual} from "react-redux"
import Comment from '../components/comment'

const Comments = () => {

    const user = useSelector(state => state.user, shallowEqual)
    const commentsOfUser = useSelector(state => state.comments.filter(comment => comment.owner.username === user.username), shallowEqual)

    return(
        <div className="container" style={{marginTop:"100px"}}>
            <h1 className="my-5 text-center text-muted">List of my comments</h1>
            {commentsOfUser.map((comment, i) => <Comment key={i} commentId={comment._id}/>)}
        </div>
    )
}

export default Comments