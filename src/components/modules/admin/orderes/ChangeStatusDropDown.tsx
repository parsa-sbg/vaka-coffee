import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import { OrderInterface } from '@/models/Order'
import mongoose from 'mongoose'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdKeyboardArrowLeft } from 'react-icons/md'

type props = {
    isOdd: boolean
    isExpired: boolean
    currentStatus: "PENDING" | "PAID" | "PREPARING" | "SENT" | "CANCELED"
    orderId: mongoose.Types.ObjectId
    setOrder: React.Dispatch<React.SetStateAction<OrderInterface>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
    setOrders: React.Dispatch<React.SetStateAction<OrderInterface[]>>
}


function ChangeStatusDropDown({ isExpired, isOdd, currentStatus, orderId, setOrder, setIsLoading, isLoading, setOrders }: props) {

    const [isOpen, setIsOpen] = useState(false)
    const [selecctedStatus, setSelecctedStatus] = useState<string | null>(null)
    const [isFirstIntial, setIsFirstIntial] = useState(true)


    const windowClickhandler = useCallback(() => {
        isOpen && setIsOpen(false)
    }, [isOpen])


    useEffect(() => {
        if (!isFirstIntial) {
            setIsLoading(true)
            fetch(`/api/orders/status/${orderId}`, {
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
                    setOrder(data.order)
                    setOrders(data.allOrders)
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
            }} className={`${isOpen ? `rounded-b-none ${isOdd ? 'bg-secondary text-main' : '' }` : ''} ${isOdd ? 'sm:hover:bg-secondary sm:hover:text-main' : 'sm:hover:bg-[#0f0f0f] sm:hover:text-main'} ${isExpired ? '!hidden' : ''} flex items-center gap-2 text-nowrap bg-main text-bgColer font-semibold pr-4 pl-1.5 py-1 rounded-md transition-all duration-300 `} >
                تغییر وضعیت
                <MdKeyboardArrowLeft className={`transition-transform duration-300 ${isOpen && '-rotate-90'}`} size={25} />
            </button>

            <div className={`${isOpen && '!max-h-32 border'} w-fit absolute z-20 right-0 transition-all rounded-b-md duration-200 top-full bg-bgColer border-secondary left-0 max-h-0 overflow-hidden`}>


                <button disabled={isLoading} onClick={() => { setSelecctedStatus('PAID') }} className={`${currentStatus == 'PAID' ? '!hidden' : ''} py-2 px-4 text-nowrap w-full hover:bg-main hover:bg-opacity-70 transition-all duration-200`}>
                    پرداخت شده
                </button>

                <button disabled={isLoading} onClick={() => { setSelecctedStatus('CANCELED') }} className={`${currentStatus == 'CANCELED' ? '!hidden' : ''} py-2 px-4 text-nowrap w-full hover:bg-main hover:bg-opacity-70 transition-all duration-200`}>
                    لغو شده
                </button>

                <button disabled={isLoading} onClick={() => { setSelecctedStatus('PREPARING') }} className={`${currentStatus == 'PREPARING' ? '!hidden' : ''} py-2 px-4 text-nowrap w-full hover:bg-main hover:bg-opacity-70 transition-all duration-200`}>
                    در حال آماده سازی
                </button>

                <button disabled={isLoading} onClick={() => { setSelecctedStatus('SENT') }} className={`${currentStatus == 'SENT' ? '!hidden' : ''} py-2 px-4 text-nowrap w-full hover:bg-main hover:bg-opacity-70 transition-all duration-200`}>
                    ارسال شده
                </button>

            </div>

        </div>
    )
}

export default ChangeStatusDropDown