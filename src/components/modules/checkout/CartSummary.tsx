import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import { Address } from '@/models/User'
import { useCartStore } from '@/store/cartStore'
import toPersianNumber from '@/utils/toPersianNubmer'
import { orderSchema } from '@/validation/order'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

type props = {
    address: Address
    phone: string
    desc: string
    setErrors: React.Dispatch<React.SetStateAction<{
        name: boolean;
        family: boolean;
        state: boolean;
        city: boolean;
        address: boolean;
        houseNumber: boolean;
    }>>
    setPhoneError: React.Dispatch<React.SetStateAction<boolean>>
}

function CartSummary({ address, desc, phone, setErrors, setPhoneError }: props) {

    const route = useRouter()

    const { cart } = useCartStore()

    const totalPrice = cart.reduce((total, item) => {
        const priceWithDiscount = item.product.price - (item.product.price * item.product.discount / 100)
        const finalPrice = priceWithDiscount * item.count
        return total + finalPrice
    }, 0)

    const sendPrice = address.city == 'تهران' ? 56000 : 99000

    const createOrder = async () => {


        const parssedData = orderSchema.safeParse({ address, description: desc, phone })
        
        if (!parssedData.success) {
            parssedData.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: 'top-left'
                })
                if (issue.path[0] == 'phone') {
                    setPhoneError(true)
                }else {
                    setErrors(prev => ({ ...prev, [issue.path[1]]: true }))
                }
            })
            return
        }


        const res = await fetch('/api/orders', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parssedData.data)
        })
        const data = await res.json()

        if (res.status == 201) {
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
        <div className='bg-[# rounded-xl border-2 border-secondary p-5'>

            <h4 className='font-bold mb-7 text-lg text-main' >سفارش شما</h4>

            <div className='flex flex-col gap-3'>
                {cart.map((item) => (
                    <div key={item.product._id.toString()} className={`flex justify-between items-center gap-10 border-secondary border-b-2 border-dashed pb-3`}>
                        <p className='flex items-center gap-2'> <span className='font-semibold text-main'>{toPersianNumber(item.count.toString())} </span> عدد {item.product.name} </p>
                        <span className='font-semibold text-main text-nowrap'>{toPersianNumber((item.count * (item.product.price - (item.product.price * item.product.discount / 100))).toLocaleString().toString())} تومان</span>
                    </div>
                ))}
                <div className={`flex justify-between items-center gap-10`}>
                    <span className='flex items-center'> {address.city == 'تهران' ? 'ارسال فوری به تهران ( پیک )' : 'ارسال به شهرستان ( پیشتاز )'} </span>
                    <span className='font-semibold text-main text-nowrap'>{toPersianNumber(sendPrice.toLocaleString().toString())} تومان</span>
                </div>

                <div className={`flex justify-between items-center gap-10 pt-3 border-t-2 border-main border-opacity-40`}>
                    <span className='flex items-center'> مجموع </span>
                    <span className='font-bold text-main text-nowrap'>{toPersianNumber((totalPrice + sendPrice).toLocaleString())} تومان</span>
                </div>

                <button onClick={createOrder} className='bg-green-700 py-2 px-5 rounded-md mt-5 transition-colors duration-300 hover:bg-green-800'>پرداخت و ثبت سفارش</button>
            </div>

        </div>
    )
}

export default CartSummary