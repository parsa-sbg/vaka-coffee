"use client"

import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { updateUserInfosSchema } from '@/validation/auth'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type props = {
  intialUserInfos: {
    name: string
    lastName: string | undefined
    email: string | undefined
  }
}

function InfoBox({ intialUserInfos }: props) {

  console.log(intialUserInfos);


  const [userInfos, setUserInfos] = useState({
    name: intialUserInfos.name,
    lastName: intialUserInfos.lastName,
    email: intialUserInfos.email
  })

  const [errors, setErrors] = useState({ name: false, lastName: false, email: false })

  const [isLoading, setIsLoading] = useState(false)


  const updateUserInfos = async () => {

    const parsedData = updateUserInfosSchema.safeParse({ name: userInfos.name, lastName: userInfos.lastName || undefined, email: userInfos.email || undefined })

    if (!parsedData.success) {
      parsedData.error.issues.map(issue => {
        setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
        toast.custom((t) => (
          <ErrorAlert t={t} title={issue.message} />
        ), {
          position: 'top-left'
        })
      })
      return false
    }


    setIsLoading(true)
    const res = await fetch('/api/auth/infos', {
      method: "PUT",
      headers: {
        "Contetnt-Type": "application/json"
      },
      body: JSON.stringify({
        name: parsedData.data.name,
        lastName: parsedData.data.lastName,
        email: parsedData.data.email
      })
    })
    setIsLoading(false)

    if (res.status == 200) {
      toast.custom((t) => (
        <SuccessAlert t={t} title='اطلاعات شما با موفقیت به روز شد .' />
      ), {
        position: 'top-left'
      })
    } else {
      toast.custom((t) => (
        <ErrorAlert t={t} title='خطایی رخ داد !' />
      ), {
        position: 'top-left'
      })
    }

  }


  return (
    <div className=''>
      <h3 className='pr-3 relative before:absolute before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0 before:bottom-0 before:my-auto before:bg-main'>اطلاعات شخصی</h3>
      <div className='mt-5 h-full grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-3.5 xl:gap-4'>

        <div className='w-full flex flex-col gap-2 sm:col-span-3 lg:col-span-3'>
          <label className='text-sm' htmlFor="name">نام</label>
          <input
            value={userInfos.name}
            onChange={(e) => {
              setUserInfos(prev => ({ ...prev, name: e.target.value }))
              setErrors(prev => ({ ...prev, name: false }))
            }}
            placeholder='نام'
            id='name'
            className={`${errors.name ? '!border-red-600' : ''} disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main`}
            type="text" />
        </div>

        <div className='w-full flex flex-col gap-2 sm:col-span-3 lg:col-span-3'>
          <label className='text-sm' htmlFor="name">نام خانوادگی</label>
          <input
            value={userInfos.lastName || ''}
            onChange={(e) => {
              setUserInfos(prev => ({ ...prev, lastName: e.target.value }))
              setErrors(prev => ({ ...prev, lastName: false }))

            }}
            placeholder='نام خانوادگی'
            id='name'
            className={`${errors.lastName ? '!border-red-600' : ''} disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main`}
            type="text" />
        </div>

        <div className='w-full flex flex-col gap-2 col-span-2 sm:col-span-4 lg:col-span-4'>
          <label className='text-sm' htmlFor="name">آدرس ایمیل</label>
          <input
            value={userInfos.email}
            onChange={(e) => {
              setUserInfos(prev => ({ ...prev, email: e.target.value }))
              setErrors(prev => ({ ...prev, email: false }))

            }}
            placeholder='آدرس ایمیل'
            id='name'
            className={`${errors.email ? '!border-red-600' : ''} disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main`}
            type="text" />
        </div>

        <div className='flex flex-col justify-end col-span-2 sm:col-span-2 lg:col-span-2'>
          <button disabled={isLoading} onClick={updateUserInfos} className={`${isLoading ? 'bg-secondary' : '' } text-nowrap bg-main text-bgColer text-sm px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main`}>
            {isLoading ? <div className='w-5 h-5 border-x-2 border-main rounded-full animate-spin mx-auto' /> : 'ذخیره اطلاعات'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default InfoBox