import React, { useState } from 'react'
import NameInput from './NameInput'
import LastNameInput from './LastNameInput'
import StateInput from './StateInput'
import CityInput from './CityInput'
import AddressInput from './AddressInput'
import HouseNumberInput from './HouseNumberInput'
import CancelBtn from './CancelBtn'
import SubmitBtn from './SubmitBtn'
import { Address } from '@/models/User'

type props = {
    provinces: { id: number, name: string }[]
    intialAddress: Address | undefined
    hideModal: () => void
    setAddress: React.Dispatch<React.SetStateAction<Address | undefined>>
}

function EditAdressModal({ provinces, intialAddress, hideModal, setAddress }: props) {

    const [selectedStateId, setSelectedStateId] = useState<null | number>(null)

    const [modalAddress, setModalAddress] = useState<Address>({
        name: intialAddress?.name || '',
        family: intialAddress?.family || '',
        state: intialAddress?.state || '',
        city: intialAddress?.city || '',
        address: intialAddress?.address || '',
        houseNumber: intialAddress?.houseNumber || '',
    })

    const [errors, setErrors] = useState({
        name: false,
        family: false,
        state: false,
        city: false,
        address: false,
        houseNumber: false,
    })


    return (
        <div className='rounded-xl z-50 bg-secondary p-5 flex flex-col gap-3'>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-5'>
                <NameInput error={errors.name} setErrors={setErrors} name={modalAddress.name} setModalAddress={setModalAddress} />
                <LastNameInput error={errors.family} setErrors={setErrors} lastName={modalAddress.family} setModalAddress={setModalAddress} />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-5'>
                <StateInput error={errors.state} setErrors={setErrors} setSelectedStateId={setSelectedStateId} provinces={provinces} state={modalAddress.state} setModalAddress={setModalAddress} />
                <CityInput error={errors.city} setErrors={setErrors} stateId={selectedStateId} city={modalAddress.city} setModalAddress={setModalAddress} />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-5'>
                <AddressInput error={errors.address} setErrors={setErrors} address={modalAddress.address} setModalAddress={setModalAddress} />
                <HouseNumberInput error={errors.houseNumber} setErrors={setErrors} houseNumber={modalAddress.houseNumber} setModalAddress={setModalAddress} />
            </div>

            <div className='flex gap-2'>
                <CancelBtn setSelectedStateId={setSelectedStateId} intialAddress={intialAddress} setModalAddress={setModalAddress} hideModal={hideModal} />
                <SubmitBtn setAddress={setAddress} hideModal={hideModal} setErrors={setErrors} modalAddress={modalAddress} />
            </div>


        </div>
    )
}

export default EditAdressModal