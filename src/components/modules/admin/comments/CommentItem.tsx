import { CommentInterface } from '@/models/Comment'
import { toPersianDate } from '@/utils/toPersianDate'
import toPersianNumber from '@/utils/toPersianNubmer'
import React, { useState } from 'react'
import EditStatusDropDown from './EditStatusDropDown'

type props = {
    intialComment: CommentInterface
    number: number
    isOdd: boolean
    setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>
}

function CommentItem({ intialComment, number, isOdd, setComments }: props) {

    const [comment, setComment] = useState(intialComment)
    const [isLoading, setIsLoading] = useState(false)


    return (
        <tr className={`${isOdd ? 'bg-[#0f0f0f]' : 'bg-secondary'} `}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersianNumber(number.toString())}</span>
            </th>
            <td className="px-3 lg:px-6 py-4">
                {comment.user.name}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {toPersianDate(comment.createdAt)}
            </td>
            <td className="px-3 lg:px-6 py-4 text-center">
                {comment.score}
            </td>
            <td className={`${comment.status == 'PENDING' ? 'text-yellow-600' : comment.status == 'ACCEPTED' ? 'text-green-600' : 'text-red-600'} px-3 lg:px-6 py-4`}>
                {isLoading ? <div className='w-3 h-3 border-x-2 border-main rounded-full animate-spin mx-auto' />
                    : comment.status == 'PENDING' ? 'در حال بررسی'
                        : comment.status == 'ACCEPTED' ? 'تایید شده' : 'رد شده'}
            </td>
            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs'>

                    <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                        مشاهده
                    </button>

                    <EditStatusDropDown setComments={setComments} currentStatus={comment.status} isLoading={isLoading} setIsLoading={setIsLoading} isOdd={isOdd} commentId={comment._id} setComment={setComment} />

                    <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                        حذف
                    </button>

                </div>
            </td>
        </tr>
    )
}

export default CommentItem