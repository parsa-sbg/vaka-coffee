import { CommentInterface } from '@/models/Comment'
import { toPersianDate } from '@/utils/toPersianDate'
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

type props = {
    isPending?: boolean
    comment: CommentInterface
}

function Comment({ isPending, comment }: props) {
    return (
        <div className={`${isPending ? 'animate-pulse !text-gray-400' : ''} pb-8 mb-8 border-b border-secondary`}>

            <div className='flex items-center justify-between'>
                <div>
                    <span className='font-semibold'>{comment.user.name}</span>
                    <span className='opacity-80'> – {toPersianDate(comment.createdAt)}</span>
                </div>
                {isPending ? <span>در حال بررسی ...</span> : ''}
                <div className='flex items-center'>
                    {Array(comment.score).fill(0).map(item => (
                        <FaStar key={Math.random()} className={`${isPending ? '!text-secondary' : ''} text-[#eabe12]`} />
                    ))}
                    {Array(5 - comment.score).fill(0).map(item => (
                        <FaRegStar key={Math.random()} className={`${isPending ? '!text-secondary' : ''} text-main`} />
                    ))}

                </div>
            </div>

            <p className='mt-8 opacity-80'>
                {comment.comment}
            </p>

        </div>
    )
}

export default Comment