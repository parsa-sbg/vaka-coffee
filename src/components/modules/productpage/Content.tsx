"use client"
import React, { useState } from 'react'
import Commetns from './comments/Commetns'
import Article from './Article'
import mongoose from 'mongoose'
import { CommentInterface } from '@/models/Comment'

type props = {
    productId: mongoose.Types.ObjectId
    intialUserPendingComments: CommentInterface[]
    acceptedComments: CommentInterface[]
}

function Content({ productId, intialUserPendingComments, acceptedComments }: props) {

    const [shownContent, setShownContent] = useState<'article' | 'comments'>('article')
    const [userPendingComments, setUserPendingComments] = useState(intialUserPendingComments)


    return (
        <div className='bg-[#0f0f0f] py-10 border-y-2 border-y-secondary'>

            <div className='container'>
                <div className='flex gap-5'>
                    <button
                        onClick={() => { setShownContent('article') }}
                        className={`${shownContent == 'article' && 'text-main'} relative font-semibold text-lg w-fit transition-all duration-300 hover:before:max-w-52
                    before:absolute before:top-[105%] before:max-w-0 before:!w-full before:h-0.5 before:bg-white before:right-0 before:transition-all before:duration-300 before:rounded-full ${shownContent == 'article' && 'before:!bg-main before:!block before:max-w-52'}`}>
                        توضیحات
                    </button>

                    <button
                        onClick={() => { setShownContent('comments') }}

                        className={`${shownContent == 'comments' && 'text-main'} relative font-semibold text-lg w-fit transition-all duration-300 hover:before:max-w-52
                    before:absolute before:top-[105%] before:max-w-0 before:!w-full before:h-0.5 before:bg-white before:right-0 before:transition-all before:duration-300 before:rounded-full ${shownContent == 'comments' && 'before:!bg-main before:!block before:max-w-52'}`}>
                        نظرات ({acceptedComments.length})
                    </button>
                </div>

                <div className='mt-6'>
                    {shownContent == 'comments'
                        ? <Commetns acceptedComments={acceptedComments} setUserPendingComments={setUserPendingComments} userPendingComments={userPendingComments} productId={productId} />
                        : <Article />
                    }
                </div>
            </div>


        </div>
    )
}

export default Content