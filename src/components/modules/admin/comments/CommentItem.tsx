import { CommentInterface } from '@/models/Comment'
import { toPersianDate } from '@/utils/toPersianDate'
import toPersianNumber from '@/utils/toPersianNubmer'
import React, { useState } from 'react'
import EditStatusDropDown from './EditStatusDropDown'
import toast from 'react-hot-toast'

type props = {
    intialComment: CommentInterface
    number: number
    isOdd: boolean
    setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>
}

function CommentItem({ intialComment, number, isOdd, setComments }: props) {

    const [comment, setComment] = useState(intialComment)
    const [isLoading, setIsLoading] = useState(false)

    const showBtnClickHandler = () => {
        toast.custom((t) => (
            <div className={`${t.visible && '!opacity-100 !scale-100'} flex flex-col gap-3 opacity-0 scale-50 transition-all duration-500 bg-secondary p-5 rounded-lg border border-main text-sm max-w-96`}>
                <h5 className='font-semibold'>اطلاعات کامنت {toPersianNumber(number.toString())} :</h5>

                <div className='flex gap-5'>
                    <span className='text-nowrap'>نام نویسنده :</span>
                    <span className='text-main'>{comment.user.name}</span>
                </div>

                <div className='flex gap-5'>
                    <span className='text-nowrap'>نام محصول :</span>
                    <span className='text-main'>{comment.product.name}</span>
                </div>

                <div className='flex gap-5'>
                    <span className='text-nowrap'>متن کامنت :</span>
                    <span className='text-main'>{comment.comment}</span>
                </div>

                <div className='flex justify-end'>
                    <button onClick={() => { toast.dismiss(t.id) }} className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-8 py-1 rounded-md transition-all duration-300 sm:hover:bg-[#0f0f0f] sm:hover:text-main'>
                        بستن
                    </button>
                </div>
            </div>
        ), {
            position: 'top-left',
            duration: 10000
        })
    }


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

                    <button onClick={showBtnClickHandler} className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
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