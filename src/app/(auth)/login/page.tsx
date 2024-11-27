"use client"
import { checkIsPhoneExist, checkIsUserNameExist, sentOtpAction } from '@/actions/authActions'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import { otpSchema, passwordSchema, phoneSchema, usernameSchema } from '@/validation/auth'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoIosWarning } from 'react-icons/io'

function Login() {

  const [loginMethod, setLoginMethod] = useState<'phone' | 'username'>('phone')
  const [step, setStep] = useState<1 | 2>(1)

  const [isLoading, setisLoading] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [phone, setPhone] = useState('')
  const [otpCode, setOtpCode] = useState('')

  const [errors, setErrors] = useState({ phone: false, username: false, otpCode: false, password: false })
  const route = useRouter()
  const [counter, setCounter] = useState(0)

  const [isSendOtpPending, setIsSendOtpPending] = useState(false)


  const checkUsername = async () => {
    // frontend validation
    const parsedData = usernameSchema.safeParse(username)
    if (!parsedData.success) {
      parsedData.error.issues.map(issue => {
        setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
        toast.custom((t) => (
          <ErrorAlert title={issue.message} t={t} />
        ), {
          position: 'top-left',
          duration: 3000
        })
      })
      setErrors(prev => ({ ...prev, username: true }))
      return
    }


    setisLoading(true)
    const isUserNameExist = await checkIsUserNameExist(username)
    setisLoading(false)

    if (isUserNameExist) {
      setStep(2)
    } else {
      setErrors(prev => ({ ...prev, username: true }))
      toast.custom((t) => (
        <div className={`${t.visible ? '!opacity-100 !scale-100' : '!opacity-0 !scale-50'} opacity-0 scale-50 transition-all duration-500 bg-white text-bgColer py-1 px-2 text-xs md:text-sm rounded-md flex items-center gap-3`}>
          <div className=' flex items-center gap-3'>
            <IoIosWarning size={25} className='text-yellow-500' />
            کاربری با این یوزر نیم پیدا نشد !
          </div>
          <button className=' py-2 px-2 border-r border-secondary' onClick={() => {
            toast.dismiss(t.id)
            redirect('/register')
          }}>ثبت نام کنید</button>
        </div>
      ), {
        position: 'top-left'
      })
    }

  }

  const checkPhone = async () => {
    const parsedData = phoneSchema.safeParse(phone)

    if (!parsedData.success) {
      parsedData.error.issues.map(issue => {
        setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
        toast.custom((t) => (
          <ErrorAlert title={issue.message} t={t} />
        ), {
          position: 'top-left',
          duration: 3000
        })
      })
      setErrors(prev => ({ ...prev, phone: true }))
      return
    }

    setisLoading(true)
    const isExist = await checkIsPhoneExist(phone)
    setisLoading(false)

    if (isExist) {
      sendOtp()
      setStep(2)
    } else {
      toast.custom((t) => (
        <div className={`${t.visible ? '!opacity-100 !scale-100' : '!opacity-0 !scale-50'} opacity-0 scale-50 transition-all duration-500 bg-white text-bgColer py-1 px-2 text-xs md:text-sm rounded-md flex items-center gap-3`}>
          <div className=' flex items-center gap-3'>
            <IoIosWarning size={25} className='text-yellow-500' />
            کاربری با این شماره پیدا نشد !
          </div>
          <button className=' py-2 px-2 border-r border-secondary' onClick={() => {
            toast.dismiss(t.id)
            redirect('/register')
          }}>ثبت نام کنید</button>
        </div>
      ), {
        position: 'top-left'
      })
    }
  }

  const loginWithUsername = async () => {

    // password validation

    const parsedData = passwordSchema.safeParse(password)
    if (!parsedData.success) {
      parsedData.error.issues.map(issue => {
        setErrors(prev => ({ ...prev, password: true }))
        toast.custom((t) => (
          <ErrorAlert title={issue.message} t={t} />
        ), {
          position: 'top-left',
          duration: 3000
        })
      })
      setErrors(prev => ({ ...prev, phone: true }))
      return
    }

    // login

    setisLoading(true)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    setisLoading(false)


    if (res.status == 200) {
      const timeOut = setTimeout(() => {
        route.replace('/dashboard')
      }, 2000);
      toast.custom((t) => (
        <div className='flex flex-col'>
          <SuccessAlert callBack={() => {
            clearTimeout(timeOut)
            route.replace('/dashboard')
          }} t={t} title='ورود با موفقیت انجام شد.' />
        </div>
      ), {
        position: 'top-left',
        duration: 1500
      })
    } else if (res.status == 401) {
      setErrors(prev => ({ ...prev, password: true }))
      toast.custom((t) => (
        <ErrorAlert t={t} title='رمز عبور صحیح نیست !' />
      ), {
        position: 'top-left'
      })
    } else {
      toast.custom((t) => (
        <ErrorAlert t={t} title='خطای ناشناخته !' />
      ), {
        position: 'top-left'
      })
    }

  }

  const sendOtp = async () => {
    // set timer
    setCounter(60)
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev == 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000);

    // send the code
    setIsSendOtpPending(true)
    const result = await sentOtpAction(phone)
    
    if (!result.success) {
      toast.custom((t) => (
        <ErrorAlert title={result.message} t={t} />
      ), {
        position: 'top-left',
        duration: 3000
      })
      setIsSendOtpPending(false)
    } else {
      setIsSendOtpPending(false)
    }
  }


  const loginWithPhone = async () => {
    // basic validation for otp code
    const parsedData = otpSchema.safeParse(otpCode)
    if (!parsedData.success) {
      setErrors(prev => ({ ...prev, otpCode: true }))
      parsedData.error.issues.map(issue => {
        setErrors(prev => ({ ...prev, password: true }))
        toast.custom((t) => (
          <ErrorAlert title={issue.message} t={t} />
        ), {
          position: 'top-left',
          duration: 3000
        })
      })
      return
    }

    // login
    setisLoading(true)
    const res = await fetch('/api/auth/login/otp', {
      method: "POST",
      headers: {
        "Content-Type": "applicaion/json"
      },
      body: JSON.stringify({
        phone,
        otpCode
      })
    })
    setisLoading(false)
    const data = await res.json()



    if (res.status == 200) {
      const timeOut = setTimeout(() => {
        route.replace('/dashboard')
      }, 2000);
      toast.custom((t) => (
        <div className='flex flex-col'>
          <SuccessAlert callBack={() => {
            clearTimeout(timeOut)
            route.replace('/dashboard')
          }} t={t} title='ورود با موفقیت انجام شد.' />
        </div>
      ), {
        position: 'top-left',
        duration: 1500
      })
    } else if (res.status == 401) {
      setErrors(prev => ({ ...prev, password: true }))
      toast.custom((t) => (
        <ErrorAlert t={t} title={data.message} />
      ), {
        position: 'top-left'
      })
    } else {
      toast.custom((t) => (
        <ErrorAlert t={t} title='خطای ناشناخته !' />
      ), {
        position: 'top-left'
      })
    }

  }



  return (
    <div className='h-full flex flex-col justify-center'>

      <div>
        <h1 className={`${step == 2 && '!hidden'} text-center text-main font-bold text-2xl`}>ورود</h1>
        <div className={`${step == 1 && '!hidden'} flex items-center gap-3 text-center justify-center`}>
          <h1 className={` text-main font-bold text-2xl`}>{loginMethod == 'phone' ? 'ورود با شماره تماس' : 'ورود با نام کاربری'}</h1>
          <button onClick={() => {
            setStep(1)
            setCounter(0)
          }} className='text-nowrap bg-main text-bgColer text-sm py-1 px-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>بازگشت</button>
        </div>

        <div className='grid grid-cols-2 mt-6'>
          <button
            disabled={step == 2}
            onClick={() => { setLoginMethod('phone') }}
            className={`${loginMethod == 'phone' && 'text-main'} relative font-semibold text-lg w-fit mx-auto transition-all duration-300 hover:before:max-w-52
           before:absolute before:top-[105%] before:max-w-0 before:!w-full before:h-0.5 before:bg-white before:right-0 before:transition-all before:duration-300 before:rounded-full disabled:text-gray-500 disabled:hover:before:max-w-0 ${loginMethod == 'phone' && 'before:!bg-main !text-main before:!block before:!max-w-52 '}
          `}>
            با شماره موبایل
          </button>

          <button
            disabled={step == 2}
            onClick={() => { setLoginMethod('username') }}
            className={`${loginMethod == 'username' && 'text-main'} relative font-semibold text-lg w-fit mx-auto transition-all duration-300 hover:before:max-w-52
           before:absolute before:top-[105%] before:max-w-0 before:!w-full before:h-0.5 before:bg-white before:right-0 before:transition-all before:duration-300 before:rounded-full disabled:text-gray-500 disabled:hover:before:max-w-0 ${loginMethod == 'username' && 'before:!bg-main !text-main before:!block before:!max-w-52 '}
          `}>
            با نام کاربری
          </button>
        </div>
      </div>

      <div>

        <input
          name='identifier'
          value={loginMethod == 'username' ? username : phone}
          maxLength={loginMethod == 'username' ? 20 : 11}

          onChange={loginMethod == 'username' ? e => {
            setUsername(e.target.value)
            setErrors(prev => ({ ...prev, username: false }))
          } : e => {
            setPhone(e.target.value)
            setErrors(prev => ({ ...prev, phone: false }))
          }}

          placeholder={loginMethod == 'username' ? 'نام کاربری' : 'شماره موبایل'}
          className={`${step == 2 && '!hidden'} ${loginMethod == 'username' ? errors.username && '!border-red-600' : errors.phone && '!border-red-600'} w-full mt-10 rounded-md bg-secondary outline-none border border-transparent py-2 px-4 transition-all duration-300 focus:border-main`}
          type="text" />

        <div className={`${step == 1 && '!hidden'} ${loginMethod == 'username' ? errors.password && '!border-red-600' : errors.otpCode && '!border-red-600'} relative has-[:focus]:!border-main mt-10 rounded-md bg-secondary border border-transparent transition-all duration-300`}>
          <input
            name='identifier'
            value={loginMethod == 'username' ? password : otpCode}
            maxLength={loginMethod == 'username' ? 2000 : 5}

            onChange={loginMethod == 'username' ? e => {
              setPassword(e.target.value)
              setErrors(prev => ({ ...prev, password: false }))
            } : e => {
              setOtpCode(e.target.value)
              setErrors(prev => ({ ...prev, otpCode: false }))
            }}

            placeholder={loginMethod == 'username' ? 'رمز عبور' : 'کد پیامک شده'}
            className={` w-full outline-none rounded-md bg-transparent py-2 px-4 `}
            type="text" />

          <button disabled={counter > 0} onClick={sendOtp} type='button' className={`${loginMethod == 'username' && '!hidden'} absolute top-0 bottom-0 h-8 my-auto left-1 w-26 text-sm sm:text-base text-nowrap bg-bgColer text-main py-1 px-3 rounded-md transition-all duration-300`}>
            {isSendOtpPending ? <div className='w-3 h-3 border-x-2 border-main rounded-full animate-spin mx-auto' /> : counter > 0 ? counter : 'ارسال مجدد'}
          </button>

        </div>


        <p className={`${step == 1 && '!hidden'} mt-2 opacity-80 text-xs sm:text-sm`}>{loginMethod == 'username' ? `رمز عبور ${username} را وارد کنید.` : `کد پیامک شده به شماره ${phone} را وارد کنید.`}</p>

        <button onClick={loginMethod == 'phone' ? checkPhone : checkUsername} className={`${step == 2 && '!hidden'} min-h-10 bg-main w-full mt-10 py-2 px-4 rounded-md transition-all duration-300 bg-opacity-70 hover:bg-opacity-100`}>
          {isLoading ? <div className='w-5 h-5 border-x-2 border-secondary rounded-full animate-spin mx-auto' /> : 'ادامه'}
        </button>

        <button onClick={loginMethod == 'username' ? loginWithUsername : loginWithPhone} className={`${step == 1 && '!hidden'} min-h-10 bg-main w-full mt-10 py-2 px-4 rounded-md transition-all duration-300 bg-opacity-70 hover:bg-opacity-100`}>
          {isLoading ? <div className='w-5 h-5 border-x-2 border-secondary rounded-full animate-spin mx-auto' /> : 'ورود'}
        </button>

      </div>

    </div>
  )
}
export default Login