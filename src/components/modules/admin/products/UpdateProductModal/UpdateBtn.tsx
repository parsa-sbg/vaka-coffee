import { productSchema } from '@/validation/product'
import mongoose from 'mongoose'
import React, { useState } from 'react'
import { errorsType } from './UpdateProductModal'
import toast from 'react-hot-toast'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { ProductInterface } from '@/models/Product'

type props = {
    name: string
    shortName: string
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
    hideModal: () => void
    resetDatas: () => void
    setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>
    uploadNewPictures: boolean
    productId: string
}

function UpdateBtn({ discount, dynamicFields, name, shortName, pictures, price, category, stock, setErrors, hideModal, resetDatas, setProducts, uploadNewPictures, productId }: props) {

    const [isLoading, setIsLoading] = useState(false)

    const clickHandler = async () => {


        // client dalidation
        const parsedData = productSchema.safeParse({
            name,
            shortName,
            price: +price,
            discount: +discount,
            dynamicFields,
            pictures,
            stock: +stock,
            category
        })

        // show validation errors
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

        const formData = new FormData()
        formData.append('name', name)
        formData.append('shortName', shortName)
        formData.append('price', price)
        formData.append('discount', discount)
        formData.append('dynamicFields', JSON.stringify(dynamicFields))
        formData.append('stock', stock)
        formData.append('category', JSON.stringify(category))
        pictures.forEach(pic => {
            formData.append('pictures', pic)
        })
        formData.append('useOldImages', JSON.stringify(!uploadNewPictures))

        setIsLoading(true)
        const res = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            body: formData
        })
        const data = await res.json()
        setIsLoading(false)


        if (res.status == 201) {
            hideModal()
            resetDatas()
            setProducts(data.allProducts)
            toast.custom((t) => (
                <SuccessAlert t={t} title='محصول با موفقیت آپدیت شد .' />
            ), {
                position: 'top-left'
            })
        } else if (res.status == 409) {
            setErrors(prev => ({ ...prev, shortName: true }))
            toast.custom((t) => (
                <ErrorAlert t={t} title={data.message} />
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

    return (
        <button disabled={isLoading} onClick={clickHandler} className={`${isLoading ? '!bg-bgColer' : ''} h-9 text-nowrap w-full bg-main text-bgColer font-semibold px-4 py-1.5 rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main`}>
            {isLoading ? <div className='w-3 h-3 border-x-2 border-main rounded-full animate-spin mx-auto' /> : 'آپدیت محصول '}
        </button>

    )
}

export default UpdateBtn