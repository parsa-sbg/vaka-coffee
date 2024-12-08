import { OrderInterface } from '@/models/Order'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

export type selectedSortType = 'PENDING' | 'PAID' | 'PREPARING' | 'SENT' | 'CANCELED' | 'EXPIRED' | null
type buttonTextType = 'پرداخت شده' | 'منقضی شده' | 'لغو شده' | 'در حال آماده سازی' | 'ارسال شده' | 'در انتظار پرداخت' | 'نمایش همه' | 'منقضی شده'


type props = {
    allOrders: OrderInterface[]
    setShownOrders: React.Dispatch<React.SetStateAction<OrderInterface[]>>
}

function Sort({ setShownOrders, allOrders }: props) {


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

        if (selectedSort == 'EXPIRED') {
            setShownOrders(allOrders.filter(order => {
                if (order.expireAt && new Date(order.expireAt).getTime() <= Date.now()) {
                    return order
                }
            }))
        } else if (selectedSort) {
            setShownOrders(allOrders.filter(order => order.status == selectedSort))
        } else {
            setShownOrders(allOrders)
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

                <button onClick={e => { OptionClickHandler('CANCELED', 'لغو شده') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    لغو شده
                </button>

                <button onClick={e => { OptionClickHandler('PAID', 'پرداخت شده') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    پرداخت شده
                </button>

                <button onClick={e => { OptionClickHandler('PENDING', 'در انتظار پرداخت') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    در انتظار پرداخت
                </button>

                <button onClick={e => { OptionClickHandler('PREPARING', 'در حال آماده سازی') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    در حال آماده سازی
                </button>

                <button onClick={e => { OptionClickHandler('SENT', 'ارسال شده') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    ارسال شده
                </button>

                <button onClick={e => { OptionClickHandler('EXPIRED', 'منقضی شده') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    منقضی شده
                </button>


            </div>

        </div>
    )
}

export default Sort