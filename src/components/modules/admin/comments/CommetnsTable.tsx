"use client"
import { CommentInterface } from '@/models/Comment'
import React, { useState } from 'react'
import CommentItem from './CommentItem'
import Filtering from './Filtering'

type props = {
    intialComments: CommentInterface[]
}

function CommetnsTable({ intialComments }: props) {

    const [comments, setComments] = useState(intialComments)
    const [shownComments, setShownComments] = useState(comments)


    return (
        <>
            <div className='flex justify-end mb-5'>
                <Filtering allComments={comments} setShownComments={setShownComments} />
            </div>
            <table className="rounded-md text-sm text-left rtl:text-right w-full">

                <thead className="text-xs text-nowrap bg-secondary">
                    <tr>
                        <th scope="col" className="px-1 py-3">
                            <span>شماره</span>
                        </th>

                        <th scope="col" className="px-3 lg:px-6 py-3">
                            نویسنده
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            تاریخ
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            امتیاز
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            وضعیت
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {shownComments.length
                        ? shownComments.map((comment, index) => (
                            <CommentItem setComments={setComments} isOdd={index % 2 == 0} key={comment._id.toString()} intialComment={comment} number={index + 1} />
                        ))
                        : <tr className='mt-7 block'>
                            <td>
                                کامنتی نیست !!
                            </td>
                        </tr>
                    }

                </tbody>
            </table>
        </>

    )
}

export default CommetnsTable