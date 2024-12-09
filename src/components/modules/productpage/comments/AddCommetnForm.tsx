"use client"
import React, { useState } from 'react'
import Rating from './Rating'
import mongoose from 'mongoose'
import { commentSchema } from '@/validation/comment'
import toast from 'react-hot-toast'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { CommentInterface } from '@/models/Comment'
import { IoIosWarning } from 'react-icons/io'
import { useRouter } from 'next/navigation'

type props = {
    productId: mongoose.Types.ObjectId
    setUserPendingComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>
}


function AddCommetnForm({ productId, setUserPendingComments }: props) {

    const [comment, setComment] = useState('')
    const [score, setScore] = useState(0)
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

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

        setIsLoading(true)
        const res = await fetch(`/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(parsedData.data)
        })
        setIsLoading(false)

        if (res.status == 201) {
            const data = await res.json()
            setUserPendingComments(prev => [data.comment, ...prev])
            toast.custom((t) => (
                <SuccessAlert t={t} title='کامنت شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود .' />
            ), {
                position: 'top-left'
            })
            setComment('')
        } else if (res.status == 401) {
            toast.custom((t) => (
                <div className={`${t.visible ? '!opacity-100 !scale-100' : '!opacity-0 !scale-50'} opacity-0 scale-50 transition-all duration-500 bg-white text-bgColer py-1 px-2 text-xs md:text-sm rounded-md flex items-center gap-3`}>
                    <div className=' flex items-center gap-3'>
                        <IoIosWarning size={25} className='text-yellow-500' />
                        برای ثبت کامنت ابتدا وارد شوید .
                    </div>
                    <button className=' py-2 px-2 border-r border-secondary' onClick={() => {
                        toast.dismiss(t.id)
                        route.push('/login')
                    }}>ورود</button>
                </div>
            ), {
                position: 'top-left'
            })
        } else {
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
                <button disabled={isLoading} onClick={createComment} type='button' className={`${isLoading ? 'bg-secondary text-main' : ''} text-nowrap bg-main text-bgColer font-semibold px-6 py-1 h-8 w-20 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main`}>

                    {isLoading
                        ? <div className='w-4 h-4 border-x-2 border-main rounded-full animate-spin mx-auto' />
                        : 'ثبت'
                    }

                </button>
            </form>


        </div>
    )
}

export default AddCommetnForm