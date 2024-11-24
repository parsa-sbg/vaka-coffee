import { Address } from '@/models/User'
import React from 'react'

type props = {
    name: string
    setModalAddress: React.Dispatch<React.SetStateAction<Address>>
    error: boolean
    setErrors: React.Dispatch<React.SetStateAction<{
        name: boolean;
        family: boolean;
        state: boolean;
        city: boolean;
        address: boolean;
        houseNumber: boolean;
    }>>
}

function NameInput({ name, setModalAddress, error, setErrors }: props) {

    return (
        <div className={`flex flex-col gap-0.5`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>نام</h5>
            <input
                onChange={e => {
                    setModalAddress(prev => ({ ...prev, name: e.target.value }))
                    setErrors(prev => ({ ...prev, name: false }))
                }}
                value={name}
                placeholder='نام'
                className={`${error ? '!border-red-600' : ''} transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-bgColer`} type="text" />
        </div>
    )
}

export default NameInput