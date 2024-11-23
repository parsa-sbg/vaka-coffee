"use client"
import { sentOtpAction } from '@/actions/authActions'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { otpSchema, phoneSchema } from '@/validation/auth'
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

type props = {
    intialNumber: string
}

function PhoneBox({ intialNumber }: props) {

    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [phone, setPhone] = useState(intialNumber)
    const inputRef = useRef<HTMLInputElement>(null)

    const [newPhone, setNewPhone] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [step])


    const resetDatas = () => {
        setNewPhone('')
        setOtpCode('')
        setStep(1)
    }


    const sentOtpCode = async () => {
        const parsedData = phoneSchema.safeParse(newPhone)

        if (!parsedData.success) {
            parsedData.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: 'top-left'
                })
            })
            setError(true)
            return false
        }

        const result = await sentOtpAction(newPhone)

        if (!result.success) {
            toast.custom((t) => (
                <ErrorAlert t={t} title='کد یکبار مصرف صحیح نیست.' />
            ), {
                position: 'top-left'
            })
            return false
        } else {
            toast.custom((t) => (
                <SuccessAlert t={t} title={result.message} />
            ), {
                position: 'top-left'
            })
            setStep(3)
            inputRef.current?.focus()
        }
    }

    const updatePhone = async () => {
        const parsedData = otpSchema.safeParse(otpCode)
        if (!parsedData.success) {
            parsedData.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: 'top-left'
                })
            })
            setError(true)
        }


        // fetch ...
        const res = await fetch('/api/auth/phone', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newPhone,
                otpCode
            })
        })
        const data = await res.json()


        if (res.status == 200) {
            setPhone(newPhone)
            toast.custom((t) => (
                <SuccessAlert t={t} title='شماره شما با موفقیت به روز شد .' />
            ), {
                position: 'top-left'
            })
            resetDatas()
        } else if (res.status == 409) {
            toast.custom((t) => (
                <ErrorAlert t={t} title={data.message} />
            ), {
                position: 'top-left'
            })
            setError(true)
        } else if (res.status == 401) {
            toast.custom((t) => (
                <ErrorAlert t={t} title={data.message} />
            ), {
                position: 'top-left'
            })
            setError(true)
        } else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }

    }

    return (
        <div className='h-full flex justify-center flex-col'>
            <h3 className='pr-3 relative before:absolute before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0 before:bottom-0 before:my-auto before:bg-main'>شماره موبایل</h3>
            <div className='mt-5 h-full flex justify-between md:flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-3.5 xl:gap-4'>
                <input
                    ref={inputRef}
                    disabled={step == 1}
                    placeholder={step == 2 ? 'شماره جدید' : 'کد ارسال شده'}
                    maxLength={step == 3 ? 5 : 11}
                    value={step == 1 ? phone : step == 2 ? newPhone : otpCode}
                    onChange={step == 2
                        ? e => {
                            setNewPhone(e.target.value)
                            setError(false)
                        }
                        : e => {
                            setOtpCode(e.target.value)
                            setError(false)
                        }
                    }
                    className={`${error ? '!border-red-600' : ''} disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main`}
                    type="text" />
                <div className='flex gap-1 md:justify-between md:w-full'>
                    <button className='text-nowrap bg-main text-bgColer text-sm px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'
                        onClick={step == 1
                            ? async () => {
                                await setStep(2)
                                inputRef.current?.focus({})
                            }
                            : step == 2 ? sentOtpCode : step == 3 ? updatePhone : () => { }
                        }>
                        {step == 1 ? 'تغییر شماره' : step == 2 ? 'ارسال کد' : 'ویرایش شماره'}
                    </button>
                    <button className={`${step !== 1 && '!block'} hidden text-sm text-nowrap bg-main text-bgColer px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main`} onClick={resetDatas}>لغو</button>
                </div>
            </div>
        </div>
    )
}

export default PhoneBox