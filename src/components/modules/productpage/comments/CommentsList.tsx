import React from 'react'
import Comment from './Comment'
import { CommentInterface } from '@/models/Comment'

type props = {
    userPendingComments: CommentInterface[]
    acceptedComments: CommentInterface[]
}

const CommentsList = React.memo(({ userPendingComments, acceptedComments }: props) => {

    return (
        <div className=''>
            <h2 className='font-semibold text-lg mb-5'>{acceptedComments.length} دیدگاه برای پودر قهوه ترک 250 گرم</h2>

            {userPendingComments.map(comment => (
                <Comment key={comment._id.toString()} comment={comment} isPending={true} />
            ))}

            {acceptedComments.map(comment => (
                <Comment key={comment._id.toString()} comment={comment} />
            ))}

            {!acceptedComments.length && !userPendingComments.length
                ? <div className='text-white text-opacity-70'>هنوز دیدگاهی ثبت نشده ! اولین نفر باشید .</div>
                : ''
            }

        </div>
    )
})


export default CommentsList