import UserInfoAlert from '@/components/common/alerts/UserInfoAlert'
import { UserInterface } from '@/models/User'
import React from 'react'
import toast from 'react-hot-toast'

type props = {
    admin: UserInterface
    isOdd: boolean
}

function ShowBtn({ admin, isOdd }: props) {


    const btnClickHandler = () => {
        toast.custom((t) => (
            <UserInfoAlert adminOrUser='ادمین' t={t} user={admin} />
        ), {
            position: 'top-left',
            duration: 10000
        })
    }

    return (
        <button onClick={btnClickHandler} className={`text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 ${isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'}  sm:hover:text-main`} >
            مشاهده
        </button>
    )
}

export default ShowBtn