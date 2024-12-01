"use client"

import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { usernameSchema } from '@/validation/auth'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'

type props = {
    serverIntialUserName: string
}

function UserNameBox({ serverIntialUserName }: props) {

    const [dataBaseUserName, setDataBaseUserName] = useState(serverIntialUserName)

    const [userName, setUserName] = useState(serverIntialUserName)
    const [error, setError] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [isInputDisable, setIsInputDisable] = useState(true)
    const [loading, setLoading] = useState(false)



    const cancelChange = () => {
        setIsInputDisable(true)
        setUserName(dataBaseUserName)
        setError(false)
    }

    const cahngeUserName = async () => {
        console.log('cahnge u name');

        const parsedData = usernameSchema.safeParse(userName)
        if (!parsedData.success) {
            parsedData.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: "top-left"
                })
            })
            setError(true)
            return
        }

        setLoading(true)
        const res = await fetch('/api/auth/username', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userName)
        })

        const data = await res.json()
        setLoading(false)

        if (res.status == 200) {
            toast.custom((t) => (
                <SuccessAlert t={t} title='نام کاربری با موفقیت تغییر کرد' />
            ))
            setIsInputDisable(true)
            setDataBaseUserName(userName)
        } else if (res.status == 409) {
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
            <h3 className='pr-3 relative before:absolute before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0 before:bottom-0 before:my-auto before:bg-main'>نام کاربری</h3>

            <div className='mt-5 h-full grid grid-cols-6 items-center gap-3 lg:gap-3.5 xl:gap-4'>
                <input
                    disabled={isInputDisable || loading}
                    ref={inputRef}
                    autoComplete='off'
                    placeholder={'نام کاربری'}
                    value={userName}
                    onChange={e => {
                        setError(false)
                        setUserName(e.target.value)
                    }}
                    className={`${error ? '!border-red-600' : ''} col-span-3 md:col-span-6 disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main`}
                    type="text" />

                <div className='flex gap-1 col-span-3 md:col-span-6 md:justify-between md:w-full'>
                    <button disabled={loading} onClick={() => {
                        if (isInputDisable) {
                            setIsInputDisable(false)
                        } else {
                            if (userName == dataBaseUserName) {
                                cancelChange()
                                return
                            }
                            cahngeUserName()
                        }
                    }} className={`${loading ? 'bg-secondary' : ''} text-nowrap bg-main text-bgColer text-sm px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main`}>
                        {isInputDisable ? 'تغییر نام کاربری' : loading ? <div className='w-3 h-3 border-x-2 border-main rounded-full animate-spin mx-auto' /> : 'ثبت'}
                    </button>
                    <button disabled={loading} onClick={cancelChange} className={`${!isInputDisable ? '!block' : ''} hidden text-sm text-nowrap bg-main text-bgColer px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main`}>
                        لغو
                    </button>
                </div>
            </div>

        </div>
    )
}

export default UserNameBox