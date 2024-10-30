"use client"
import React, { useState } from 'react'

function PasswordBox() {

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [oldPassword, setOldPassword] = useState('')




  const stepOneClickHandler = () => {
    setStep(2)
  }

  const stepTwoClickHandler = () => {
    setStep(3)
  }

  const stepThreeClickHandler = () => {
    setStep(1)
  }

  return (
    <div className='h-full flex justify-center flex-col'>
      <h3 className='pr-3 relative before:absolute before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0 before:bottom-0 before:my-auto before:bg-main'>تغییر رمز عبور</h3>

      <div className='mt-5 h-full flex justify-between md:flex-wrap lg:flex-nowrap items-center gap-4'>
        <input
          placeholder={step == 1 ? 'رمز عبور فعلی' : step == 2 ? 'رمز عبور جدید' : 'تکرار رمز عبور جدید'}
          value={oldPassword}
          onChange={e => { setOldPassword(e.target.value) }}
          className=' disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main'
          type="password" />
        <div className='flex gap-1 md:justify-between md:w-full'>
          <button
            onClick={step == 1 ? stepOneClickHandler : step == 2 ? stepTwoClickHandler : stepThreeClickHandler}
            className='text-nowrap bg-main text-bgColer text-sm px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
            ادامه
          </button>
        </div>
      </div>

    </div>
  )
}

export default PasswordBox