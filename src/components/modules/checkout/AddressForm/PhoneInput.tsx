import React from 'react'

type props = {
    phone: string,
    setPhone: React.Dispatch<React.SetStateAction<string>>
    error: boolean
    setPhoneError: React.Dispatch<React.SetStateAction<boolean>>
}


function PhoneInput({ phone, setPhone, error, setPhoneError }: props) {
    return (
        <div className={`flex flex-col gap-0.5`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>شماره تماس</h5>
            <input
                maxLength={11}
                onChange={e => {
                    setPhone(e.target.value)
                    setPhoneError(false)
                }}
                value={phone}
                placeholder='شماره تماس'
                className={`${error ? '!border-red-600' : ''} transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-bgColer`} type="text" />
        </div>)
}

export default PhoneInput