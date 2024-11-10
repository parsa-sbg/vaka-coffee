import { sentOtpAction } from '@/actions/authActions';
import ErrorAlert from '@/components/common/alerts/ErrorAlert';
import { phoneSchema } from '@/validation/auth';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    setErrors: React.Dispatch<React.SetStateAction<{
        name: boolean;
        username: boolean;
        phone: boolean;
        password: boolean;
        repeatPassword: boolean;
        otp: boolean;
    }>>
    errors: {
        name: boolean;
        username: boolean;
        phone: boolean;
        password: boolean;
        repeatPassword: boolean;
        otp: boolean;
    }

    formDatas: {
        name: string;
        username: string;
        phone: string;
        password: string;
        repeatPassword: string;
        otp: string;
    }

    setFormDatas: React.Dispatch<React.SetStateAction<{
        name: string;
        username: string;
        phone: string;
        password: string;
        repeatPassword: string;
        otp: string;
    }>>
}

function PhoneInputs({ setErrors, errors, formDatas, setFormDatas }: Props) {

    const [isOtpSent, setIsOtpSent] = useState(false)
    const [isSendOtpPending, setIsSendOtpPending] = useState(false)
    const [counter, setCounter] = useState(0)
    const [inputsValue, setInputValues] = useState({ digit1: '', digit2: '', digit3: '', digit4: '', digit5: '', })

    const digit1 = useRef<HTMLInputElement | null>(null)
    const digit2 = useRef<HTMLInputElement | null>(null)
    const digit3 = useRef<HTMLInputElement | null>(null)
    const digit4 = useRef<HTMLInputElement | null>(null)
    const digit5 = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setErrors(prev => ({ ...prev, otp: false }))
        setFormDatas(prev => ({ ...prev, otp: Object.values(inputsValue).join('') }))
    }, [inputsValue])


    const sendOtp = async () => {
        // validation
        const parsedData = phoneSchema.safeParse(formDatas.phone)
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

        // // send otp

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
        const result = await sentOtpAction(formDatas.phone)

        if (!result.success) {
            toast.custom((t) => (
                <ErrorAlert title={result.message} t={t} />
            ), {
                position: 'top-left',
                duration: 3000
            })
            setIsSendOtpPending(false)
        } else {
            setIsOtpSent(true)
            setIsSendOtpPending(false)
            digit1.current?.focus()
        }
    }


    return (
        <div className={`min-h-[41.4px]`}>
            <div className={`${errors.phone && '!border-red-500'} border border-transparent relative mt-4 pl-28 transition-all duration-400 rounded-md bg-secondary`}>
                <input
                    value={formDatas.phone}
                    onChange={e => {
                        setFormDatas(prev => ({ ...prev, phone: e.target.value }))
                        setErrors(prev => ({ ...prev, phone: false }))
                    }}
                    maxLength={11}
                    autoComplete='phone'
                    placeholder='شماره موبایل'
                    name='phone'
                    dir='ltr'
                    className={`${isOtpSent && '!opacity-0'} opacity-100 transition-all duration-300 w-full bg-transparent rounded-r-md outline-none py-2 px-3 placeholder:text-right`}
                    type="text" />

                <div className={`${isOtpSent && 'w-full '} flex items-center justify-end absolute py-1 h-full left-1 top-0 bottom-0 my-auto gap-1 sm:gap-3`}>

                    <div className={`${isOtpSent && '!max-w-52 px-1 py-0.5'} bg-secondary flex items-center gap-1 overflow-hidden max-w-0 transition-all duration-500 h-full rounded-md`}>
                        <span className='text-nowrap text-sm opacity-80'>کد ارسالی :</span>
                        <div className={`grid grid-cols-5 h-full gap-1 text-sm rounded-md`}>
                            <input
                                ref={digit5}
                                value={inputsValue.digit5}
                                maxLength={1}
                                onKeyUp={e => {
                                    if (e.key == "Backspace") {
                                        digit4.current?.focus()
                                    }
                                }}
                                onChange={e => {
                                    setInputValues(prev => ({ ...prev, digit5: e.target.value }))
                                    if (e.target.value.length == 1) {
                                        e.target.blur()
                                    }
                                }}
                                onFocus={(e) => { e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length); }}
                                className={`${errors.otp && 'border-red-600'} border w-6 h-full my-auto transition-all duration-700 rounded-sm text-center border-main bg-transparent placeholder:text-right text-main outline-none`}
                                type="tel" />
                            <input
                                ref={digit4}
                                maxLength={1}
                                value={inputsValue.digit4}
                                onKeyUp={e => {
                                    if (e.key == "Backspace") {
                                        digit3.current?.focus()
                                    }
                                }}
                                onChange={e => {
                                    setInputValues(prev => ({ ...prev, digit4: e.target.value }))
                                    if (e.target.value.length == 1) {
                                        digit5.current?.focus()
                                    }
                                }}
                                onFocus={(e) => { e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length); }}
                                className={`${errors.otp && 'border-red-600'} border w-6 h-full my-auto transition-all duration-700 rounded-sm text-center border-main bg-transparent placeholder:text-right text-main outline-none`}
                                type="tel" />
                            <input
                                ref={digit3}
                                maxLength={1}
                                value={inputsValue.digit3}
                                onKeyUp={e => {
                                    if (e.key == "Backspace") {
                                        digit2.current?.focus()
                                    }
                                }}
                                onChange={e => {
                                    setInputValues(prev => ({ ...prev, digit3: e.target.value }))
                                    if (e.target.value.length == 1) {
                                        digit4.current?.focus()
                                    }
                                }}
                                onFocus={(e) => { e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length); }}
                                className={`${errors.otp && 'border-red-600'} border w-6 h-full my-auto transition-all duration-700 rounded-sm text-center border-main bg-transparent placeholder:text-right text-main outline-none`}
                                type="tel" />
                            <input
                                ref={digit2}
                                maxLength={1}
                                value={inputsValue.digit2}
                                onKeyUp={e => {
                                    if (e.key == "Backspace") {
                                        digit1.current?.focus()
                                    }
                                }}
                                onChange={e => {
                                    setInputValues(prev => ({ ...prev, digit2: e.target.value }))
                                    if (e.target.value.length == 1) {
                                        digit3.current?.focus()
                                    }
                                }}
                                onFocus={(e) => { e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length); }}
                                className={`${errors.otp && 'border-red-600'} border w-6 h-full my-auto transition-all duration-700 rounded-sm text-center border-main bg-transparent placeholder:text-right text-main outline-none`}
                                type="tel" />
                            <input
                                ref={digit1}
                                value={inputsValue.digit1}
                                maxLength={1}
                                onChange={e => {
                                    setInputValues(prev => ({ ...prev, digit1: e.target.value }))
                                    if (e.target.value.length == 1) {
                                        digit2.current?.focus()
                                    }
                                }}
                                onFocus={(e) => { e.target.setSelectionRange(e.target.value.length - 1, e.target.value.length); }}
                                className={`${errors.otp && 'border-red-600'} border w-6 h-full my-auto transition-all duration-700 rounded-sm text-center border-main bg-transparent placeholder:text-right text-main outline-none`}
                                type="tel" />
                        </div>
                    </div>

                    <button disabled={isOtpSent ? counter > 0 : false} onClick={sendOtp} type='button' className='w-26 text-sm sm:text-base h-full text-nowrap bg-bgColer text-main py-1 px-3 rounded-md transition-all duration-300'>
                        {isSendOtpPending ? <div className='w-3 h-3 border-x-2 border-main rounded-full animate-spin mx-auto' /> : isOtpSent ? counter > 0 ? counter : 'ارسال مجدد' : 'ارسال کد'}
                    </button>

                </div>
            </div>
            <p className={`${isOtpSent && 'max-h-10 mt-2'} transition-all duration-700 text-xs max-h-0 overflow-hidden`}>
                کد پیامک شده به شماره {formDatas.phone} را وارد کنید.

                <button onClick={() => {
                    setIsOtpSent(false)
                    setCounter(0)
                    setInputValues({ digit1: '', digit2: '', digit3: '', digit4: '', digit5: '', })
                }} type='button' className='text-xs h-full text-nowrap bg-bgColer text-main p-1 rounded-md transition-all duration-300'>بازگشت</button>
            </p>
        </div>

    )
}

export default PhoneInputs