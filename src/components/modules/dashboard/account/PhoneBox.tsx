"use client"
import React, { useState } from 'react'

function PhoneBox() {

    const [isDisabled, setIsDisabled] = useState(true)
    const [phone, setPhone] = useState('09055017931')


    const cancelChange = () => {
        setPhone('09055017931')
        setIsDisabled(true)
    }

    return (
        <div className='h-full flex justify-center flex-col'>
            <h3 className='pr-3 relative before:absolute before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0 before:bottom-0 before:my-auto before:bg-main'>شماره موبایل</h3>
            <div className='mt-5 h-full flex justify-between md:flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-3.5 xl:gap-4'>
                <input
                    disabled={isDisabled}
                    value={phone}
                    onChange={e => { setPhone(e.target.value) }}
                    className=' disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main'
                    type="text" />
                <div className='flex gap-1 md:justify-between md:w-full'>
                    <button className='text-nowrap bg-main text-bgColer text-sm px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' onClick={isDisabled ? () => {setIsDisabled(false)} : () => {} }>{isDisabled ? 'تغییر شماره' : 'ارسال کد'}</button>
                    <button className={`${!isDisabled && '!block'} hidden text-sm text-nowrap bg-main text-bgColer px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main`} onClick={cancelChange}>لغو</button>
                </div>
            </div>
        </div>
    )
}

export default PhoneBox