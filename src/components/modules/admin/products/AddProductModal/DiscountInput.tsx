import React from 'react'

type props = {
    discount: string,
    setDiscount: React.Dispatch<React.SetStateAction<string>>
}

function DiscountInput({ discount, setDiscount }: props) {

    const cahngehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+e.target.value) && +e.target.value <= 100) {
            setDiscount(e.target.value.trim())
        }
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!e.target.value.trim().length) {
            setDiscount('0')
        }
    }

    const onFocushandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!+e.target.value) {
            setDiscount('')
        }
    }


    return (
        <div className=' flex flex-col gap-1'>
            <h5 className='mb-1 font-semibold'>درصد تخفیف</h5>
            <input onFocus={e => { onFocushandler(e) }} onBlur={e => { onBlurHandler(e) }} value={discount} onChange={e => { cahngehandler(e) }} className='w-full outline-none rounded-md border border-transparent focus:border-main transition-all duration-300 py-1.5 px-3 bg-bgColer' type="text" />
        </div>
    )
}

export default DiscountInput