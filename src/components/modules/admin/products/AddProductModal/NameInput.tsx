import React from 'react'
import { errorsType } from './AddProductModal'

type props = {
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
    error: boolean
    setErrors: React.Dispatch<React.SetStateAction<errorsType>>
}

function NameInput({ name, setName, error, setErrors }: props) {


    const changeHanndler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setErrors(prev => ({ ...prev, name: false }))
    }

    return (
        <div className={`flex flex-col gap-1 ${error ? 'text-red-600' : ''}`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>نام محصول</h5>
            <input value={name} onChange={changeHanndler} className={`${error ? '!border-red-600' : ''} transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-bgColer`} type="text" />
        </div>
    )
}

export default NameInput