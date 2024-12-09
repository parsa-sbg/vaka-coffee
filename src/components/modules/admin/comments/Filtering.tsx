import { CommentInterface } from '@/models/Comment'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

type selectedSortType = 'PENDING' | 'ACCEPTED' | 'REJECTED' | null
type buttonTextType = 'تایید شده' | 'در حال بررسی' | 'رد شده' | 'نمایش همه'

type props = {
    allComments: CommentInterface[]
    setShownComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>
}

function Filtering({ allComments, setShownComments }: props) {


    const [isOpen, setIsOpen] = useState(false)
    const [buttonText, setButtonText] = useState<buttonTextType>('نمایش همه')

    const windowClickhandler = useCallback(() => {
        isOpen && setIsOpen(false)
    }, [isOpen])


    useEffect(() => {
        window.addEventListener('click', windowClickhandler)
        return () => {
            window.removeEventListener('click', windowClickhandler)
        }
    }, [windowClickhandler])


    const btnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setIsOpen(prev => !prev)
    }

    const OptionClickHandler = (selectedSort: selectedSortType, title: buttonTextType) => {
        setButtonText(title)
        setIsOpen(false)

        if (selectedSort) {
            setShownComments(allComments.filter(order => order.status == selectedSort))
        } else {
            setShownComments(allComments)
        }
    }

    return (
        <div onClick={e => { e.stopPropagation() }} className='relative text-sm '>

            <button
                onClick={btnClickHandler}
                className={`z-50 py-2 px-1 pl-0 text-nowrap border-b min-w-52 flex items-center justify-between transition-all duration-300 ${isOpen && 'border-b-main'}`}>
                {buttonText}
                <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
            </button>

            <div className={`${isOpen && '!max-h-64 border'} w-fit absolute z-30 shadow-lg shadow-bgColer right-0 transition-all rounded-b-md duration-200 top-full bg-bgColer border-secondary left-0 max-h-0 overflow-hidden`}>

                <button onClick={e => { OptionClickHandler(null, 'نمایش همه') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    نمایش همه
                </button>

                <button onClick={e => { OptionClickHandler('ACCEPTED', 'تایید شده') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    تایید شده
                </button>

                <button onClick={e => { OptionClickHandler('PENDING', 'در حال بررسی') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    در حال بررسی
                </button>

                <button onClick={e => { OptionClickHandler('REJECTED', 'رد شده') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    رد شده
                </button>

            </div>

        </div>
    )
}

export default Filtering