"use client"
import { CategoryInterface } from '@/models/Category' 

import { ProductInterface } from '@/models/Product'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

type props = {
    categories: CategoryInterface[]
    products: ProductInterface[]
    setShownProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>
}

function Categories({ categories, products, setShownProducts }: props) {

    type selecctedCatIdType = CategoryInterface | null
    type buttonTextType = string

    const [isOpen, setIsOpen] = useState(false)
    const [selecctedcat, setSelecctedcat] = useState<selecctedCatIdType>(null)
    const [buttonText, setButtonText] = useState<buttonTextType>('نمایش همه')

    useEffect(() => {
        if (!selecctedcat) {
            setShownProducts(products)
        } else {
            setShownProducts([...products].filter(item => item.category._id == selecctedcat._id))
        }
    }, [products])

    useEffect(() => {
        setButtonText(selecctedcat?.name || 'نمایش همه')
        setIsOpen(false)

        if (!selecctedcat) {
            setShownProducts(products)
        } else {
            setShownProducts([...products].filter(item => item.category._id == selecctedcat._id))
        }
    }, [selecctedcat])

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


    return (
        <div onClick={e => { e.stopPropagation() }} className='relative text-sm '>

            <button
                onClick={btnClickHandler}
                className={`z-50 py-2 px-1 pl-0 text-nowrap border-b min-w-40 flex items-center justify-between transition-all duration-300 ${isOpen && 'border-b-main'}`}>
                {buttonText}
                <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
            </button>

            <div className={`${isOpen && '!max-h-52 border'} w-fit absolute right-0 transition-all rounded-b-md duration-200 top-full bg-bgColer border-secondary left-0 max-h-0 overflow-hidden`}>

                <button onClick={e => { setSelecctedcat(null) }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    نمایش همه
                </button>

                {categories.map(cat => (
                    <button key={cat._id.toString()} onClick={e => { setSelecctedcat(cat) }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                        {cat.name}
                    </button>
                ))}


            </div>

        </div>

    )
}

export default Categories