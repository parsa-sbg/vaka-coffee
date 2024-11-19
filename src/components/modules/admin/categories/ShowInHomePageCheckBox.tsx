import { hideCatFromHomePage, showCatInHomePage } from '@/actions/category'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import mongoose from 'mongoose'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type props = {
    iscategoryShowInHomePageIntial: boolean
    catId: mongoose.Types.ObjectId
    catName: string
}

function ShowInHomePageCheckBox({ iscategoryShowInHomePageIntial, catId, catName }: props) {

    const [isChecked, setIsChecked] = useState(iscategoryShowInHomePageIntial)
    const [isLoading, seIsLoading] = useState(false)

    const changeHandler = async () => {
        seIsLoading(true)
        if (isChecked) {
            const result = await hideCatFromHomePage(catId)
            if (result.success) {
                setIsChecked(false)
                toast.custom((t) => (
                    <SuccessAlert t={t} title={`دسته بندی ${catName} با موفقیت از صفحه اصلی حذف شد`} />
                ), {
                    position: 'top-left'
                })
            } else {
                toast.custom((t) => (
                    <ErrorAlert t={t} title='خطایی رخ داد !' />
                ), {
                    position: 'top-left'
                })
            }
        } else {
            const result = await showCatInHomePage(catId)
            if (result.success) {
                setIsChecked(true)
                toast.custom((t) => (
                    <SuccessAlert t={t} title={`دسته بندی ${catName} با موفقیت به صفحه اصلی اضافه شد`} />
                ), {
                    position: 'top-left'
                })
            } else {
                toast.custom((t) => (
                    <ErrorAlert t={t} title='خطایی رخ داد !' />
                ), {
                    position: 'top-left'
                })
            }
        }
        seIsLoading(false)
    }

    return (
        <div className='flex justify-center items-center gap-2'>
            <label className=" items-center cursor-pointer">
                <input
                    onChange={changeHandler}
                    value=''
                    disabled={isLoading}
                    checked={isChecked}
                    type="checkbox"
                    className="sr-only peer" />
                <div className={`${isLoading ? 'animate-pulse' : ''} relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-main`} ></div>
            </label>
        </div>
    )
}

export default ShowInHomePageCheckBox