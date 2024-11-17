import React from 'react'
import { errorsType } from './AddProductModal'

type props = {
    price: string
    setPrice: React.Dispatch<React.SetStateAction<string>>
    error: boolean
    setErrors: React.Dispatch<React.SetStateAction<errorsType>>
}

function PriceInput({ price, setPrice, error, setErrors }: props) {


    const cahngehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+e.target.value)) {
            setPrice(e.target.value.trim())
            setErrors(prev => ({ ...prev, price: false }))
        }
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!e.target.value.trim().length) {
            setPrice('0')
        }
    }

    const onFocushandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!+e.target.value) {
            setPrice('')
        }
    }

    return (
        <div className={`flex flex-col gap-1 ${error ? 'text-red-600' : ''}`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>قیمت</h5>
            <input onFocus={e => { onFocushandler(e) }} onBlur={e => { onBlurHandler(e) }} value={price} onChange={e => { cahngehandler(e) }} className={`${error ? '!border-red-600' : ''} outline-none rounded-md border border-transparent focus:border-main transition-all duration-300 py-1.5 px-3 bg-bgColer`} type="text" />
        </div>
    )
}

export default PriceInput