import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { ProductInterface } from '@/models/Product'
import mongoose from 'mongoose'
import React, { useState } from 'react'
import toast, { Toast } from 'react-hot-toast'


type props = {
    setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>
    productname: string
    id: mongoose.Types.ObjectId
    isOdd: boolean
}

function DeleteBtn({ setProducts, productname, id, isOdd }: props) {

    const [isLoading, setIsLoading] = useState(false)



    const deleteProduct = async (t: Toast) => {
        // update toast with loading
        toast.custom((t) => (
            <div className={`${t.visible ? '!opacity-100 !scale-100' : '!opacity-0 !scale-50'} w-72 h-[105.41px] opacity-0 scale-50 transition-all duration-500 bg-secondary p-3 rounded-md max-w-72 text-sm border border-main border-opacity-50`}>
                <p className='h-10'>در حال پردازش ...</p>
                <div className='flex mt-3 items-end justify-end gap-3'>
                    <button className='text-nowrap bg-main h-7 text-bgColer font-semibold px-4 md:px-8 py-1 rounded-md transition-all duration-300 sm:hover:bg-[#0f0f0f] sm:hover:text-main'>
                        <div className='w-3 h-3 border-x-2 border-secondary rounded-full animate-spin mx-auto' />
                    </button>
                </div>
            </div>
        ), {
            position: 'top-left',
            duration: 20000,
            id: t.id
        })

        setIsLoading(true)
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        })
        toast.dismiss(t.id)
        setIsLoading(false)
        const data = await res.json()

        if (res.status == 200) {
            setProducts(data.allProducts)
            toast.custom((t) => (
                <SuccessAlert t={t} title='محصول مورد نظر با موفقیت حذف شد .' />
            ), {
                position: 'top-left'
            })
        } else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }
    }


    const btnClickHandler = () => {
        toast.custom((t) => (
            <div className={`${t.visible ? '!opacity-100 !scale-100' : '!opacity-0 !scale-50'} opacity-0 scale-50 transition-all duration-500 bg-secondary p-3 rounded-md max-w-72 text-sm border border-main border-opacity-50`}>
                <p>آیا از حذف این محصول با نام {productname} مطمئن هستید ؟</p>
                <div className='flex justify-end gap-3 mt-3'>
                    <button onClick={() => { toast.dismiss(t.id) }} className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-8 py-1 rounded-md transition-all duration-300 sm:hover:bg-[#0f0f0f] sm:hover:text-main'>لغو</button>
                    <button onClick={() => { deleteProduct(t) }} className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-8 py-1 rounded-md transition-all duration-300 sm:hover:bg-[#0f0f0f] sm:hover:text-main'>
                        حذف
                    </button>
                </div>
            </div>
        ), {
            position: 'top-left',
            duration: 20000
        })
    }

    return (
        <button onClick={btnClickHandler} className={`${!isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'}  text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:text-main`} >
            {isLoading ? <div className='w-3 h-3 border-x-2 border-secondary rounded-full animate-spin mx-auto' /> : 'حذف'}
        </button>
    )
}

export default DeleteBtn