"use client"

import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/useModal'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function LogOUtBtn() {

    const { hideModal, isModalShow, showModal } = useModal()
    const route = useRouter()
    const { setCart } = useCartStore()


    const logOut = async () => {
        const res = await fetch('/api/auth/logout')
        if (res.status == 200) {
            setCart([])
            const timeOut = setTimeout(() => {
                route.replace('/')
            }, 2000);

            hideModal()

            toast.custom((t) => (
                <SuccessAlert callBack={() => {
                    route.replace('/')
                    clearTimeout(timeOut)
                }} t={t} title='با موفقیت خارج شدید' />
            ), {
                position: 'top-left',
                duration: 2000
            })
        }
    }

    return (
        <>
            <li>
                <button onClick={showModal} className='text-right py-2 px-4 rounded-md transition-all duration-200 hover:bg-[#0f0f0f] hover:text-main w-full'>خروج</button>
            </li>
            <Modal isModalShow={isModalShow} coverClickhandler={hideModal} >
                <div className='border bg-secondary p-4 border-bgColer rounded-lg'>
                    <p className='font-semibold text-lg'>خروج از اکانت ؟</p>
                    <div className='mt-4 flex gap-2'>
                        <button onClick={hideModal} className={`text-nowrap w-full bg-main text-bgColer font-semibold px-6 py-1 rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main`} >
                            لغو
                        </button>
                        <button onClick={logOut} className={`text-nowrap w-full bg-main text-bgColer font-semibold px-6 py-1 rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main`} >
                            خروج
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default LogOUtBtn