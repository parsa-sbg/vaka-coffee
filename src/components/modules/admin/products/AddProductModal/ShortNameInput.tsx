import React from 'react'
import { errorsType } from './AddProductModal'

type props = {
    shortName: string,
    setShortName: React.Dispatch<React.SetStateAction<string>>
    error: boolean
    setErrors: React.Dispatch<React.SetStateAction<errorsType>>
}

function ShortNameInput({ shortName, setShortName, error, setErrors }: props) {


    const changeHanndler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortName(e.target.value)
        setErrors(prev => ({ ...prev, shortName: false }))
    }

    return (
        <div className={`flex flex-col gap-1 ${error ? 'text-red-600' : ''} transition-all duration-300`}>
            <h5 className='mb-1 font-semibold'>نام کوتاه</h5>
            <input maxLength={20} value={shortName} onChange={changeHanndler} className={`${error ? '!border-red-600' : ''} outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-bgColer`} type="text" />
        </div>
    )
}

export default ShortNameInput