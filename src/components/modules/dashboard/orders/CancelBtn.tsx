import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import { OrderInterface } from '@/models/Order'
import mongoose from 'mongoose'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type props = {
    setOrder: React.Dispatch<React.SetStateAction<OrderInterface>>
    orderId: mongoose.Types.ObjectId
}

function CancelBtn({ setOrder, orderId }: props) {

    const [isLoading, setIsLoading] = useState(false)


    const clickHandler = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/orders/cancel/${orderId}`, {
            method: "PUT"
        })
        const data = await res.json()
        setIsLoading(false)

        if (res.status == 200) {
            setOrder(data.order)
        } else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }
    }

    return (
        <button disabled={isLoading} onClick={clickHandler} className={`${isLoading ? '' : 'sm:hover:bg-secondary sm:hover:text-main'} text-nowrap block text-sm bg-main text-bgColer px-4 py-1 rounded-md transition-all duration-300 `}>
            {isLoading
                ? <div className='w-4 m-0.5 h-4 border-x-2 border-secondary rounded-full animate-spin mx-auto' />
                : 'لغو'
            }
        </button>
    )
}

export default CancelBtn