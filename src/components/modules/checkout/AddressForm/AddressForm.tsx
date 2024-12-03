"use client"

import React, { useState } from 'react'
import NameInput from '../../dashboard/address/EditAdressModal/NameInput'
import LastNameInput from '../../dashboard/address/EditAdressModal/LastNameInput'
import StateInput from '../../dashboard/address/EditAdressModal/StateInput'
import CityInput from '../../dashboard/address/EditAdressModal/CityInput'
import AddressInput from '../../dashboard/address/EditAdressModal/AddressInput'
import HouseNumberInput from '../../dashboard/address/EditAdressModal/HouseNumberInput'
import { Address } from '@/models/User'
import DescInput from './DescInput'
import PhoneInput from './PhoneInput'


type props = {
    provinces: { id: number, name: string }[]
    address: Address
    setAddress: React.Dispatch<React.SetStateAction<Address>>
    errors: {
        name: boolean;
        family: boolean;
        state: boolean;
        city: boolean;
        address: boolean;
        houseNumber: boolean;
    }
    setErrors: React.Dispatch<React.SetStateAction<{
        name: boolean;
        family: boolean;
        state: boolean;
        city: boolean;
        address: boolean;
        houseNumber: boolean;
    }>>

    description: string
    setDescription: React.Dispatch<React.SetStateAction<string>>
    phone: string
    setPhone: React.Dispatch<React.SetStateAction<string>>
    phoneError: boolean
    setPhoneError: React.Dispatch<React.SetStateAction<boolean>>
}

function AddressForm({ provinces, address, setAddress, errors, setErrors, description, setDescription, phone, setPhone, phoneError, setPhoneError }: props) {

    const [selectedStateId, setSelectedStateId] = useState<null | number>(null)


    return (
        <div className='rounded-xl bg-secondary p-5'>
            <h4 className='font-bold mb-7 text-lg text-main' >صورت حساب و حمل و نقل</h4>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-12'>


                <div className='sm:col-span-4 md:col-span-6 xl:col-span-4'> <NameInput error={errors.name} setErrors={setErrors} name={address.name} setModalAddress={setAddress} /></div>

                <div className='sm:col-span-4 md:col-span-6 xl:col-span-4'> <LastNameInput error={errors.family} setErrors={setErrors} lastName={address.family} setModalAddress={setAddress} /></div>

                <div className='sm:col-span-4 md:col-span-6 xl:col-span-4'> <StateInput error={errors.state} setErrors={setErrors} setSelectedStateId={setSelectedStateId} provinces={provinces} state={address.state} setModalAddress={setAddress} /> </div>

                <div className='sm:col-span-4 md:col-span-6 xl:col-span-4'> <CityInput error={errors.city} setErrors={setErrors} stateId={selectedStateId} city={address.city} setModalAddress={setAddress} /> </div>

                <div className='sm:col-span-4 md:col-span-6 xl:col-span-4'> <HouseNumberInput error={errors.houseNumber} setErrors={setErrors} houseNumber={address.houseNumber} setModalAddress={setAddress} /></div>

                <div className='sm:col-span-4 md:col-span-6 xl:col-span-4'> <PhoneInput error={phoneError} setPhoneError={setPhoneError} phone={phone} setPhone={setPhone} /> </div>

                <div className='sm:col-span-6 md:col-span-12 lg:col-span-6 xl:col-span-6'> <AddressInput error={errors.address} setErrors={setErrors} address={address.address} setModalAddress={setAddress} /> </div>

                <div className='sm:col-span-6 md:col-span-12 lg:col-span-6 xl:col-span-6'> <DescInput description={description} setDescription={setDescription} /> </div>


            </div>
        </div>
    )
}

export default AddressForm