import { Address } from '@/models/User'
import React from 'react'


type props = {
    address: string
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

function AddressInput({ address, setModalAddress, error, setErrors }: props) {
    return (
        <div className={`flex flex-col gap-0.5 basis-3/4`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>آدرس</h5>
            <textarea onChange={e => {
                setErrors(prev => ({ ...prev, address: false }))
                setModalAddress(prev => ({ ...prev, address: e.target.value }))
            }} value={address} placeholder='آدرس' className={`${error ? '!border-red-600' : ''} custom-scrollbar h-16 resize-none transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-bgColer`} />
        </div>
    )
}

export default AddressInput