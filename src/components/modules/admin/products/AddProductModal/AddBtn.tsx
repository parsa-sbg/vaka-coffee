import { productSchema } from '@/validation/product'
import mongoose from 'mongoose'
import React from 'react'
import { errorsType } from './AddProductModal'
import toast from 'react-hot-toast'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'

type props = {
    name: string
    discount: string
    stock: string
    category: mongoose.Types.ObjectId | null
    price: string
    pictures: File[]
    dynamicFields: {
        id: string;
        key: string;
        value: string;
    }[]
    setErrors: React.Dispatch<React.SetStateAction<errorsType>>
}

function AddBtn({ discount, dynamicFields, name, pictures, price, category, stock, setErrors }: props) {


    const clickHandler = () => {
        const parsedData = productSchema.safeParse({
            name,
            price: +price,
            discount: +discount,
            dynamicFields,
            pictures,
            stock: +stock,
            category
        })

        if (!parsedData.success) {

            parsedData.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: 'top-left'
                })
            })

            parsedData.error.issues.map(issue => {
                if (issue.path[0] == 'dynamicFields') {
                    setErrors(prev => ({ ...prev, dynamicFields: [...prev.dynamicFields, { index: issue.path[1] as number, section: issue.path[2] as 'key' | 'value' }] }))
                } else if (issue.path[0] == 'pictures') {
                    setErrors(prev => ({ ...prev, pictures: [...prev.pictures, +issue.path[1]] }))
                } else {
                    setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
                }
            })
            return
        }

        

    }

    return (
        <button onClick={clickHandler} className='text-nowrap w-full bg-main text-bgColer font-semibold px-4 py-1.5 rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main'>
            افزودن محصول
        </button>
    )
}

export default AddBtn