import { Address } from '@/models/User'
import React from 'react'

type props = {
    hideModal: () => void
    setModalAddress: React.Dispatch<React.SetStateAction<Address>>
    intialAddress: Address | undefined
    setSelectedStateId: React.Dispatch<React.SetStateAction<number | null>>
}

function CancelBtn({ hideModal, setModalAddress, intialAddress, setSelectedStateId }: props) {
    return (
        <button onClick={() => {
            hideModal()
            setTimeout(() => {
                setSelectedStateId(null)
                setModalAddress({
                    name: intialAddress?.name || '',
                    family: intialAddress?.family || '',
                    state: intialAddress?.state || '',
                    city: intialAddress?.city || '',
                    address: intialAddress?.address || '',
                    houseNumber: intialAddress?.houseNumber || '',
                })
            }, 150);

        }} className={`w-full mt-3 text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main`} >
            لغو
        </button>
    )
}

export default CancelBtn