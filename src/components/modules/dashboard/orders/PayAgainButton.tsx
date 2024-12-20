import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import mongoose from 'mongoose'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type props = {
    orderId: mongoose.Types.ObjectId
}

function PayAgainButton({ orderId }: props) {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const clickHandler = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/orders/${orderId}`, {
            method: "PUT"
        })
        const data = await res.json()
        setIsLoading(false)
        
        if (res.status == 200) {
            route.replace(data.paymentUrl)
        } else {

            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }

    }

    return (
        <button disabled={isLoading} onClick={clickHandler} className='text-nowrap block text-sm bg-main text-bgColer px-4 py-1 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>پرداخت</button>
    )
}

export default PayAgainButton