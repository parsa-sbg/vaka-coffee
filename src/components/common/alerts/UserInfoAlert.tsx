import { UserInterface } from '@/models/User'
import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'
import toast, { Toast } from 'react-hot-toast'


type props = {
    user: UserInterface
    t: Toast
    adminOrUser: 'ادمین' | 'کاربر'
}


function UserInfoAlert({ user, t, adminOrUser }: props) {


    return (
        <div className={`${t.visible && '!opacity-100 !scale-100'} opacity-0 scale-50 transition-all duration-500 bg-secondary p-3 rounded-md w-72 text-sm border border-main border-opacity-50`}>
            <h4>مشخصات {adminOrUser} :</h4>

            <div className='flex items-center gap-2 mt-2 border-r-2 pr-1 border-main border-opacity-50'>
                <span>نام : </span>
                <span className='text-main'>{user.name}</span>
            </div>

            <div className='flex items-center gap-2 mt-2 border-r-2 pr-1 border-main border-opacity-50'>
                <span> نام کاربری : </span>
                <span className='text-main'>{user.username}</span>
            </div>

            <div className='flex items-center gap-2 mt-2 border-r-2 pr-1 border-main border-opacity-50'>
                <span> شماره تماس :</span>
                <span className='text-main'>{toPersianNumber(user.phone)}</span>
            </div>

            <div className='flex items-center gap-2 mt-2 border-r-2 pr-1 border-main border-opacity-50'>
                <span> ایمیل :</span>
                <span className='text-main'>ندارد</span>
            </div>

            <div className={`${!user.address && '!flex'} items-center gap-2 mt-2`}>
                <h4 className='border-r-2 pr-1 border-main border-opacity-50'>آدرس :</h4>
                <div >{user.address
                    ?
                    <div className='mr-2 border-r-2 pr-1 border-main border-opacity-50'>

                        <div className='flex items-center gap-2 mt-2'>
                            <span> نام :</span>
                            <span className='text-main'>{user.address.name}</span>
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                            <span> نام خانوادگی :</span>
                            <span className='text-main'>{user.address.family}</span>
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                            <span> استان :</span>
                            <span className='text-main'>{user.address.state}</span>
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                            <span> شهر :</span>
                            <span className='text-main'>{user.address.city}</span>
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                            <span> آدرس :</span>
                            <span className='text-main'>{user.address.address}</span>
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                            <span> پلاک :</span>
                            <span className='text-main'>{user.address.houseNumber}</span>
                        </div>

                    </div>
                    :
                    <span className='text-main'>ندارد</span> }
                </div>
            </div>

            <div className='flex justify-end'>
                <button onClick={() => { toast.dismiss(t.id) }} className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-8 py-1 rounded-md transition-all duration-300 sm:hover:bg-[#0f0f0f] sm:hover:text-main'>
                    بستن
                </button>
            </div>

        </div>
    )
}

export default UserInfoAlert