import { Address } from '@/models/User'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'


type props = {
    state: string
    setModalAddress: React.Dispatch<React.SetStateAction<Address>>
    provinces: { id: number, name: string }[]
    setSelectedStateId: React.Dispatch<React.SetStateAction<number | null>>
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

function StateInput({ setModalAddress, state, provinces, setSelectedStateId, error, setErrors }: props) {

    const [isOpen, setIsOpen] = useState(false)

    const windowClickhandler = useCallback(() => {
        isOpen && setIsOpen(false)
    }, [isOpen])


    useEffect(() => {
        window.addEventListener('click', windowClickhandler)
        return () => {
            window.removeEventListener('click', windowClickhandler)
        }
    }, [windowClickhandler])

    const btnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setErrors(prev => ({ ...prev, state: false }))
        setIsOpen(prev => !prev)
    }

    const OptionClickHandler = (stateName: string, stateId: number) => {
        setModalAddress(prev => ({ ...prev, state: stateName }))
        setErrors(prev => ({ ...prev, state: false }))
        setSelectedStateId(stateId)
        setIsOpen(false)
    }

    return (
        <div className={`flex flex-col gap-0.5 w-full relative`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>استان</h5>

            <button
                onClick={btnClickHandler}
                className={`z-50 px-4 py-1.5 pl-1 ${error ? '!border-red-600' : ''} ${isOpen && '!border-main'} text-nowrap w-full flex items-center rounded-md border border-transparent bg-bgColer justify-between transition-all duration-300`}>
                {state || 'انتخاب کنید ...'}
                <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
            </button>

            <div className={`${isOpen && '!max-h-52 border-x border-b'} overflow-y-auto custom-scrollbar absolute right-0 transition-all rounded-b-md duration-200 top-full border-secondary bg-[#0f0f0f] left-0 max-h-0 overflow-hidden`}>

                {provinces.map(province => (
                    <button key={province.id} onClick={() => { OptionClickHandler(province.name, province.id) }} className='py-2 px-4 text-nowrap w-full hover:bg-bgColer transition-all duration-200'>
                        {province.name}
                    </button>
                ))}

            </div>

        </div>
    )
}

export default StateInput