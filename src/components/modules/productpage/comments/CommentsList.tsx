import React  from 'react'
import Comment from './Comment'

const CommentsList = React.memo(() => {
    
    return (
        <div className=''>
            <h2 className='font-semibold text-lg mb-5'>28 دیدگاه برای پودر قهوه ترک 250 گرم</h2>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
    )
})


export default CommentsList