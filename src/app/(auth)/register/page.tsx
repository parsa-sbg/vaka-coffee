import React from 'react'

function Register() {
    return (
        <div className='h-full flex flex-col justify-center'>

            <div>
                <h1 className='text-center text-main font-bold text-2xl'>ثبت نام کنید</h1>
            </div>


            <form className='' action="">
                <input
                    name='name'
                    placeholder='نام'
                    className='w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main'
                    type="text" />

                <input
                    placeholder='نام کاربری'
                    name='username'
                    className='w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main'
                    type="text" />

                <input
                    placeholder='شماره موبایل'
                    name='phone'
                    className='w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main'
                    type="text" />

                <input
                    placeholder='رمز عبور'
                    name='password'
                    className='w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main'
                    type="password" />

                <input
                    placeholder='تکرار رمز عبور '
                    name='password'
                    className='w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main'
                    type="password" />

                <button className='bg-main w-full mt-10 py-2 px-4 rounded-md transition-all duration-300 bg-opacity-70 hover:bg-opacity-100'>
                    ادامه
                </button>
            </form>

        </div>)
}

export default Register