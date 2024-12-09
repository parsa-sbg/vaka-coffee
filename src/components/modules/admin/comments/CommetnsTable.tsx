"use client"
import { CommentInterface } from '@/models/Comment'
import React from 'react'
import CommentItem from './CommentItem'

type props = {
    allComments: CommentInterface[]
}

function CommetnsTable({ allComments }: props) {
    return (
        <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

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

                {allComments.map((comment, index) => (
                    <CommentItem isOdd={index % 2 == 0} key={comment._id.toString()} comment={comment} number={index + 1} />
                ))}

            </tbody>
        </table>
    )
}

export default CommetnsTable