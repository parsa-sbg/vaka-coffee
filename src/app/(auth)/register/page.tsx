"use client"

import ErrorAlert from '@/components/common/alerts/ErrorAlert';
import SuccessAlert from '@/components/common/alerts/SuccessAlert';
import PhoneInputs from '@/components/modules/register/PhoneInputs';
import { useCartStore } from '@/store/cartStore';
import { userRegisterSchema } from '@/validation/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { SafeParseReturnType } from 'zod';


type serverResStatus400 = SafeParseReturnType<{
    name: string;
    username: string;
    phone: string;
    password: string;
    repeatPassword: string;
}, {
    name: string;
    username: string;
    phone: string;
    password: string;
    repeatPassword: string;
}>
type serverResStatus409 = {
    message: string
    target: string
}

function Register() {
    const { localCart } = useCartStore()
    
    const formDataLocalCart = localCart || []

    const [formDatas, setFormDatas] = useState({ name: '', username: '', phone: '', password: '', repeatPassword: '', otp: '', formDataLocalCart })
    const [isPending, setIsPending] = useState(false)
    const [errors, setErrors] = useState({ name: false, username: false, phone: false, password: false, repeatPassword: false, otp: false })
    const route = useRouter()



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

        // register

        setIsPending(true)
        const res = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify(formDatas)
        })
        setIsPending(false)
        const data: serverResStatus400 & serverResStatus409 = await res.json()

        if (res.status == 401) {
            setErrors(prev => ({ ...prev, otp: true }))
            toast.custom((t) => (
                <ErrorAlert title={data.message} t={t} />
            ), {
                position: 'top-left',
                duration: 3000
            })
        }

        if (res.status == 400 && !data.success) {
            data.error.issues.map(error => {
                setErrors(prev => ({ ...prev, [error.path[0]]: true }))
                toast.custom((t) => (
                    <ErrorAlert title={error.message} t={t} />
                ), {
                    position: 'top-left',
                    duration: 3000
                })
            })
            return
        }

        if (res.status == 409) {
            setErrors(prev => ({ ...prev, [data.target]: true }))
            toast.custom((t) => (
                <ErrorAlert t={t} title={data.message} />
            ), {
                position: 'top-left'
            })
            return
        }

        if (res.status == 500) {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطای ناشناخته !' />
            ), {
                position: 'top-left'
            })
            return
        }

        if (res.status == 201) {
            const timeOut = setTimeout(() => {
                route.replace('/dashboard')
            }, 2000);
            toast.custom((t) => (
                <div className='flex flex-col'>
                    <SuccessAlert callBack={() => {
                        clearTimeout(timeOut)
                        route.replace('/dashboard')
                    }} t={t} title='ثبت نام با موفقیت انجام شد.' />
                </div>
            ), {
                position: 'top-left',
                duration: 1500
            })
            return
        }
    }


    return (
        <div className='h-full flex flex-col justify-center'>

            <div>
                <h1 className='text-center text-main font-bold text-2xl'>ثبت نام کنید</h1>
            </div>


            <form className='text-white text-opacity-80' onSubmit={e => { onSubmitHandler(e) }}>
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

                <PhoneInputs errors={errors} formDatas={formDatas} setErrors={setErrors} setFormDatas={setFormDatas} />

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
