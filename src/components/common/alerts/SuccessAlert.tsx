import React from 'react'
import toast, { Toast } from 'react-hot-toast'
import { FaRegCheckCircle } from "react-icons/fa";


type props = {
    title: string,
    t: Toast,
    callBack?: () => void,
}

function SuccessAlert({ title, t, callBack }: props) {

    return (
        <div className={`${t.visible ? '!opacity-100 !scale-100' : '!opacity-0 !scale-50'} relative rounded-md opacity-0 scale-50 transition-all duration-500 bg-green-800 py-1.5 px-2 text-sm flex items-center gap-3`}>
            <div className=' flex items-center gap-3'>
                <FaRegCheckCircle size={25} className='' />
                {title}
            </div>
            <button className=' py-2 px-2 border-r border-secondary' onClick={() => {
                toast.dismiss(t.id)
                callBack && callBack()
            }}>
                تایید
            </button>
        </div>
    )
}

export default SuccessAlert