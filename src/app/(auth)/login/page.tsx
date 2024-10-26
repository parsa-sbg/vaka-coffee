"use client"
import React, { useState } from 'react'

function Login() {

  const [loginMethod, setLoginMethod] = useState<'phone' | 'username'>('phone')

  return (
    <div className='h-full flex flex-col justify-center'>

      <div>
        <h1 className='text-center text-main font-bold text-2xl'>ورود / ثبت نام</h1>

        <div className='grid grid-cols-2 mt-6'>
          <button
            onClick={() => { setLoginMethod('phone') }}
            className={`${loginMethod == 'phone' && 'text-main'} relative font-semibold text-lg w-fit mx-auto transition-all duration-300 hover:before:max-w-52
           before:absolute before:top-[105%] before:max-w-0 before:!w-full before:h-0.5 before:bg-white before:right-0 before:transition-all before:duration-300 before:rounded-full ${loginMethod == 'phone' && 'before:!bg-main before:!block before:max-w-52'}
          `}>
            با شماره موبایل
          </button>

          <button
            onClick={() => { setLoginMethod('username') }}
            className={`${loginMethod == 'username' && 'text-main'} relative font-semibold text-lg w-fit mx-auto transition-all duration-300 hover:before:max-w-52
           before:absolute before:top-[105%] before:max-w-0 before:!w-full before:h-0.5 before:bg-white before:right-0 before:transition-all before:duration-300 before:rounded-full ${loginMethod == 'username' && 'before:!bg-main before:!block before:max-w-52'}
          `}>
            با نام کاربری
          </button>
        </div>
      </div>


      <form className='' action="">
        <input
          name='identifier'
          placeholder={loginMethod == 'username' ? 'نام کاربری' : 'شماره موبایل'}
          className='w-full mt-10 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main'
          type="text" />

        <button className='bg-main w-full mt-10 py-2 px-4 rounded-md transition-all duration-300 bg-opacity-70 hover:bg-opacity-100'>
          ادامه
        </button>
      </form>

    </div>
  )
}

export default Login