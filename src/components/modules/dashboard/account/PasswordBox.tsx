"use client"
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { passwordSchema } from '@/validation/auth'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function PasswordBox() {

  const [step, setStep] = useState<1 | 2 | 3>(1)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [repeatNewPassword, setRepeatNewPassword] = useState('')

  const [error, setError] = useState(false)


  useEffect(() => {
    setError(false)
  }, [step])


  const stepOneClickHandler = () => {
    const parsedPass = passwordSchema.safeParse(oldPassword)
    if (!parsedPass.success) {
      setError(true)
      parsedPass.error.issues.map(issue => {
        toast.custom((t) => (
          <ErrorAlert t={t} title={issue.message} />
        ), {
          position: 'top-left'
        })
      })
    } else {
      setStep(2)
    }
  }

  const resetData = () => {
    setStep(1)
    setOldPassword('')
    setNewPassword('')
    setRepeatNewPassword('')
  }

  const stepTwoClickHandler = () => {

    const parsedPass = passwordSchema.safeParse(newPassword)
    if (!parsedPass.success) {
      setError(true)
      parsedPass.error.issues.map(issue => {
        toast.custom((t) => (
          <ErrorAlert t={t} title={issue.message} />
        ), {
          position: 'top-left'
        })
      })
    }

    setStep(3)
  }

  const changePassword = async () => {

    if (newPassword !== repeatNewPassword) {
      toast.custom((t) => (
        <ErrorAlert t={t} title='تکرار رمز عبور صحیح نیست !' />
      ), {
        position: 'top-left'
      })
      setError(true)
      return false
    }

    // fetch ...
    const res = await fetch('/api/auth/password', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    })

    if (res.status == 200) {
      toast.custom((t) => (
        <SuccessAlert t={t} title='رمز عبور شما با موفقیت به روز شد .' />
      ), {
        position: 'top-left'
      })
      resetData()
    } else if (res.status == 401) {
      toast.custom((t) => (
        <ErrorAlert t={t} title='رمز قدیمی صحیح نیست !' />
      ), {
        position: 'top-left'
      })
      resetData()
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
      <h3 className='pr-3 relative before:absolute before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0 before:bottom-0 before:my-auto before:bg-main'>تغییر رمز عبور</h3>

      <div className='mt-5 h-full flex justify-between md:flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-3.5 xl:gap-4'>
        <input
          placeholder={step == 1 ? 'رمز عبور فعلی' : step == 2 ? 'رمز عبور جدید' : 'تکرار رمز عبور جدید'}
          value={step == 1 ? oldPassword : step == 2 ? newPassword : repeatNewPassword}
          onChange={e => {
            setError(false)
            step == 1 && setOldPassword(e.target.value)
            step == 2 && setNewPassword(e.target.value)
            step == 3 && setRepeatNewPassword(e.target.value)
          }}
          className={`${error ? '!border-red-600' : ''} disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main`}
          type="password" />
        <div className='flex gap-1 md:justify-between md:w-full'>
          <button
            onClick={step == 1 ? stepOneClickHandler : step == 2 ? stepTwoClickHandler : changePassword}
            className='text-nowrap bg-main text-bgColer text-sm px-3 md:px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
            ادامه
          </button>
        </div>
      </div>

    </div>
  )
}

export default PasswordBox