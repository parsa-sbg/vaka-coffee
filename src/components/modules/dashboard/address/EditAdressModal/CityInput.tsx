import { Address } from '@/models/User'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

type props = {
    city: string
    setModalAddress: React.Dispatch<React.SetStateAction<Address>>
    stateId: number | null
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

function CityInput({ stateId, city, setModalAddress, error, setErrors }: props) {


    const [isOpen, setIsOpen] = useState(false)

    const [cities, setCities] = useState<{ id: number, name: string, province_id: number }[]>([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setModalAddress(prev => ({ ...prev, city: '' }))
        setIsLoading(true)
        fetch(`/api/locations/cities/${stateId}`)
            .then(res => res.json())
            .then(data => {
                setCities(data)
                setIsLoading(false)
            })
    }, [stateId])

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
        setErrors(prev => ({ ...prev, city: false }))
        setIsOpen(prev => !prev)
    }

    const OptionClickHandler = (cityName: string) => {
        setModalAddress(prev => ({ ...prev, city: cityName }))
        setErrors(prev => ({ ...prev, city: false }))
        setIsOpen(false)
    }


    return (
        <div className={`flex flex-col gap-0.5 w-full relative`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>شهر</h5>

            <button
                onClick={btnClickHandler}
                className={`z-50 px-4 py-1.5 pl-1 ${error ? '!border-red-600' : ''} ${isOpen && '!border-main'} text-nowrap w-full flex items-center rounded-md border border-transparent bg-bgColer justify-between transition-all duration-300`}>
                {city ? city : isLoading ? <span className='animate-pulse'>بارگذاری ...</span> : 'انتخاب کنید ...'}
                <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
            </button>

            <div className={`${isOpen && '!max-h-52 border-x border-b'} overflow-y-auto custom-scrollbar absolute right-0 transition-all rounded-b-md duration-200 top-full border-secondary bg-[#0f0f0f] left-0 max-h-0 overflow-hidden`}>

                {cities.map(city => (
                    <button key={city.id} onClick={() => { OptionClickHandler(city.name) }} className='py-2 px-4 text-nowrap w-full hover:bg-bgColer transition-all duration-200'>
                        {city.name}
                    </button>
                ))}

            </div>

        </div>
    )
}

export default CityInput