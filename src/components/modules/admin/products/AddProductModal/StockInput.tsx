import React from 'react'

type props = {
    stock: string,
    setStock: React.Dispatch<React.SetStateAction<string>>
}

function StockInput({ stock, setStock }: props) {

    const cahngehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(+e.target.value)) {
            setStock(e.target.value.trim())
        }
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!e.target.value.trim().length) {
            setStock('0')
        }
    }

    const onFocushandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        if (!+e.target.value) {
            setStock('')
        }
    }


    return (
        <div className=' flex flex-col gap-1'>
            <h5 className='mb-1 font-semibold'>موجودی</h5>
            <input onFocus={e => { onFocushandler(e) }} onBlur={e => { onBlurHandler(e) }} value={stock} onChange={e => { cahngehandler(e) }} className='w-full outline-none rounded-md border border-transparent focus:border-main transition-all duration-300 py-1.5 px-3 bg-bgColer' type="text" />
        </div>
    )
}

export default StockInput