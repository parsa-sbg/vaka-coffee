"use client"

import ErrorAlert from '@/components/common/alerts/ErrorAlert';
import { userRegisterSchema } from '@/validation/auth/userRegisterSchema'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


function Register() {

    const [formDatas, setFormDatas] = useState({ name: '', username: '', phone: '', password: '', repeatPassword: '' })
    const [isPending, setIsPending] = useState(false)
    const [errors, setErrors] = useState({ name: false, username: false, phone: false, password: false, repeatPassword: false })


    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // frontEnd validation

        const parsedData = userRegisterSchema.safeParse(formDatas)

        if (!parsedData.success) {
            parsedData.error.errors.map(error => {
                setErrors(prev => ({ ...prev, [error.path[0]]: true }))
                toast.custom((t) => (
                    <ErrorAlert title={error.message} t={t} />
                ), {
                    position: 'top-left',
                    duration: 3000
                })
            })
            return false
        }



        setIsPending(true)
        const res = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify(formDatas)
        })
        const data = await res.json()


        setIsPending(false)

        // set server errors or show register result
    }

    return (
        <div className='h-full flex flex-col justify-center'>

            <div>
                <h1 className='text-center text-main font-bold text-2xl'>ثبت نام کنید</h1>
            </div>


            <form onSubmit={e => { onSubmitHandler(e) }}>
                <input
                    value={formDatas.name}
                    onChange={e => {
                        setFormDatas(prev => ({ ...prev, name: e.target.value }))
                        setErrors(prev => ({ ...prev, name: false }))
                    }}
                    name='name'
                    autoComplete='given-name'
                    placeholder='نام'
                    className={`${errors.name && '!border-red-500'} w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main`}
                    type="text" />

                <input
                    value={formDatas.username}
                    onChange={e => {
                        setFormDatas(prev => ({ ...prev, username: e.target.value }))
                        setErrors(prev => ({ ...prev, username: false }))

                    }
                    }
                    autoComplete='username'
                    placeholder='نام کاربری'
                    name='username'
                    className={`${errors.username && '!border-red-500'} w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main`}
                    type="text" />

                <input
                    value={formDatas.phone}
                    onChange={e => {
                        setFormDatas(prev => ({ ...prev, phone: e.target.value }))
                        setErrors(prev => ({ ...prev, phone: false }))

                    }}
                    autoComplete='phone'
                    placeholder='شماره موبایل'
                    name='phone'
                    className={`${errors.phone && '!border-red-500'} w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main`}
                    type="text" />

                <input
                    value={formDatas.password}
                    onChange={e => {
                        setFormDatas(prev => ({ ...prev, password: e.target.value }))
                        setErrors(prev => ({ ...prev, password: false, repeatPassword: false }))

                    }}
                    placeholder='رمز عبور'
                    name='password'
                    autoComplete='new-password'
                    className={`${errors.password && '!border-red-500'} w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main`}
                    type="password" />

                <input
                    value={formDatas.repeatPassword}
                    onChange={e => {
                        setFormDatas(prev => ({ ...prev, repeatPassword: e.target.value }))
                        setErrors(prev => ({ ...prev, repeatPassword: false, password: false }))

                    }}
                    placeholder='تکرار رمز عبور'
                    autoComplete='new-password'

                    className={`${errors.repeatPassword && '!border-red-500'} w-full mt-4 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main`}
                    type="password" />

                <button disabled={isPending} className='min-h-10 bg-main w-full mt-10 py-2 px-4 rounded-md transition-all duration-300 bg-opacity-70 hover:bg-opacity-100'>
                    {isPending ? <div className='w-5 h-5 border-x-2 border-secondary rounded-full animate-spin mx-auto' /> : 'ثبت نام'}
                </button>
            </form>

        </div>
    )
}

export default Register
