"use client"
import React, { useState } from 'react'
import AddressForm from './AddressForm/AddressForm'
import { Address } from '@/models/User'
import CartSummary from './CartSummary'

type props = {
    intialAddress: Address | undefined
    intialPhone: string
    provinces: { id: number, name: string }[]
}

function Page({ intialAddress, provinces, intialPhone }: props) {

    const [address, setAddress] = useState<Address>({
        name: intialAddress?.name || '',
        family: intialAddress?.family || '',
        state: intialAddress?.state || '',
        city: intialAddress?.city || '',
        address: intialAddress?.address || '',
        houseNumber: intialAddress?.houseNumber || '',
    })

    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState(intialPhone)

    const [errors, setErrors] = useState({
        name: false,
        family: false,
        state: false,
        city: false,
        address: false,
        houseNumber: false,
    })

    const [phoneError, setPhoneError] = useState(false)

    return (
        <div className='grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-5'>
            <div className='col-span-2 md:col-span-6 lg:col-span-7 xl:col-span-7'> <AddressForm phoneError={phoneError} setPhoneError={setPhoneError} phone={phone} setPhone={setPhone} description={description} setDescription={setDescription} address={address} errors={errors} setAddress={setAddress} setErrors={setErrors} provinces={provinces} /> </div>
            <div className='col-span-2 md:col-span-6 lg:col-span-5 xl:col-span-5'> <CartSummary setErrors={setErrors} setPhoneError={setPhoneError} desc={description} phone={phone} address={address} /> </div>
        </div>
    )
}

export default Page