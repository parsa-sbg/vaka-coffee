import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import { CommentInterface } from '@/models/Comment'
import mongoose from 'mongoose'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdKeyboardArrowLeft } from 'react-icons/md'

type props = {
    isOdd: boolean
    currentStatus: "PENDING" | "ACCEPTED" | "REJECTED"
    commentId: mongoose.Types.ObjectId
    setComment: React.Dispatch<React.SetStateAction<CommentInterface>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
    setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>
}

function EditStatusDropDown({ isOdd, currentStatus, commentId, setComment, setIsLoading, isLoading, setComments }: props) {

    const [isOpen, setIsOpen] = useState(false)
    const [selecctedStatus, setSelecctedStatus] = useState<string | null>(null)
    const [isFirstIntial, setIsFirstIntial] = useState(true)


    const windowClickhandler = useCallback(() => {
        isOpen && setIsOpen(false)
    }, [isOpen])


    useEffect(() => {
        if (!isFirstIntial) {
            setIsLoading(true)
            fetch(`/api/comments/status/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selecctedStatus)
            }).then(res => {
                setIsLoading(false)
                if (res.status == 200) {
                    const data = res.json()
                    return data
                } else {
                    toast.custom((t) => (
                        <ErrorAlert t={t} title='خطایی رخ داد !' />
                    ), {
                        position: 'top-left'
                    })
                    return null
                }
            }).then(data => {
                if (data) {
                    setComments(data.allComments)
                    setComment(data.comment)
                }
            })
        } else {
            setIsFirstIntial(false)
        }
    }, [selecctedStatus])


    useEffect(() => {
        window.addEventListener('click', windowClickhandler)
        return () => {
            window.removeEventListener('click', windowClickhandler)
        }
    }, [windowClickhandler])



    return (
        <div className='relative'>

            <button disabled={isLoading} onClick={(e) => {
                e.stopPropagation()
                setIsOpen(prev => !prev)
            }} className={`${isOpen ? `rounded-b-none ${isOdd ? 'bg-secondary text-main' : '!bg-[#0f0f0f] text-main'}` : ''} ${isOdd ? 'sm:hover:bg-secondary sm:hover:text-main' : 'sm:hover:bg-[#0f0f0f] sm:hover:text-main'} flex items-center gap-2 text-nowrap bg-main text-bgColer font-semibold pr-4 pl-1.5 py-1 rounded-md transition-all duration-300 `} >
                تغییر وضعیت
                <MdKeyboardArrowLeft className={`transition-transform duration-300 ${isOpen && '-rotate-90'}`} size={25} />
            </button>

            <div className={`${isOpen && '!max-h-32 border'} w-fit absolute z-20 right-0 transition-all rounded-b-md duration-200 top-full bg-bgColer border-secondary left-0 max-h-0 overflow-hidden`}>


                <button disabled={isLoading} onClick={() => { setSelecctedStatus('ACCEPTED') }} className={`${currentStatus == 'ACCEPTED' ? '!hidden' : ''} py-2 px-4 text-nowrap w-full hover:bg-main hover:bg-opacity-70 transition-all duration-200`}>
                    تایید شده
                </button>

                <button disabled={isLoading} onClick={() => { setSelecctedStatus('PENDING') }} className={`${currentStatus == 'PENDING' ? '!hidden' : ''} py-2 px-4 text-nowrap w-full hover:bg-main hover:bg-opacity-70 transition-all duration-200`}>
                    در حال بررسی
                </button>

                <button disabled={isLoading} onClick={() => { setSelecctedStatus('REJECTED') }} className={`${currentStatus == 'REJECTED' ? '!hidden' : ''} py-2 px-4 text-nowrap w-full hover:bg-main hover:bg-opacity-70 transition-all duration-200`}>
                    رد شده
                </button>


            </div>

        </div>
    )
}

export default EditStatusDropDown