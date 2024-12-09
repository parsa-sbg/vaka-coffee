"use client"
import React, { useState } from 'react'
import Rating from './Rating'
import mongoose from 'mongoose'
import { commentSchema } from '@/validation/comment'
import toast from 'react-hot-toast'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'

type props = {
    productId: mongoose.Types.ObjectId
}


function AddCommetnForm({ productId }: props) {

    const [comment, setComment] = useState('')
    const [score, setScore] = useState(0)

    const createComment = async () => {
        // client validation

        const parsedData = commentSchema.safeParse({
            comment,
            score,
            productId
        })

        if (!parsedData.success) {
            parsedData.error.issues.forEach(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: 'top-left'
                })
            })
            return
        }

        const res = await fetch(`/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(parsedData.data)
        })

        if (res.status == 201) {
            toast.custom((t) => (
                <SuccessAlert t={t} title='کامنت شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود .' />
            ), {
                position: 'top-left'
            })
            setComment('')
        }else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }

    }


    return (
        <div className='h-96'>
            <h3 className='font-semibold text-lg'>دیدگاه خود را بنویسید</h3>
            <div className='mt-2 flex gap-2'>
                <span>امتیاز شما :</span>
                <Rating onRatingChange={(score) => { setScore(score) }} />
            </div>

            <form action="">
                <textarea value={comment} onChange={e => { setComment(e.target.value) }} className='w-full bg-transparent outline-none border border-secondary resize-y rounded-md mt-5 max-h-64 h-48 min-h-36 p-3' placeholder='دیدگاه شما...' name="" id=""></textarea>
                <button onClick={createComment} type='button' className='text-nowrap bg-main text-bgColer font-semibold px-6 py-1 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>
                    ثبت
                </button>
            </form>


        </div>
    )
}

export default AddCommetnForm