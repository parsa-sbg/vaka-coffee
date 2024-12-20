import React from 'react'
import toast, { Toast } from 'react-hot-toast'
import { IoIosWarning } from 'react-icons/io'

type props = {
    title: string,
    t: Toast,
}

function ErrorAlert({ title, t }: props) {
    return (
        <div className={`${t.visible ? '!opacity-100 !scale-100' : '!opacity-0 !scale-50'} opacity-0 scale-50 transition-all duration-500 bg-red-800 py-1.5 px-2 text-sm rounded-md flex items-center gap-3`}>
            <div className=' flex items-center gap-3'>
                <IoIosWarning size={25} className='text-yellow-500' />
                {title}
            </div>
            <button className=' py-2 px-2 border-r border-secondary' onClick={() => { toast.dismiss(t.id) }}>تایید</button>
        </div>
    )
}

export default ErrorAlert