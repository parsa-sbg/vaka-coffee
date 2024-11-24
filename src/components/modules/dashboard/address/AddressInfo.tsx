"use client"

import Button from '@/components/common/Button'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/useModal'
import React, { useState } from 'react'
import EditAdressModal from './EditAdressModal/EditAdressModal'
import { Address } from '@/models/User'

type props = {
    intialAddress: Address | undefined
    provinces: { id: number, name: string }[]
}

function AddressInfo({ intialAddress, provinces }: props) {

    const [address, setAddress] = useState(intialAddress)
    const { hideModal, isModalShow, showModal } = useModal()

    return (
        <div className=''>
            <p>آدرس‌ زیر به طور پیش‌فرض در صفحه پرداخت مورد استفاده قرار می‌گیرد.</p>

            <div className={` flex items-center gap-3 mt-3`}>
                <h4 className='font-semibold text-lg'>آدرس شما</h4>
                <div className={`${!address ? 'hidden' : ''} text-xs`}>
                    <Button link={false} callback={showModal} text='ویرایش'></Button>
                </div>
            </div>

            <div className={`${!address ? 'hidden' : ''} mt-3 flex flex-col gap-3`}>

                <div className='flex items-center gap-5'>
                    <span className='min-w-12'>نام</span>
                    <span className='text-main font-semibold'>{address?.name || 'ثبت نشده'}</span>
                </div>

                <div className='flex items-center gap-5'>
                    <span className='min-w-12'>نام خانوادگی</span>
                    <span className='text-main font-semibold'>{address?.family || 'ثبت نشده'}</span>
                </div>

                <div className='flex items-center gap-5'>
                    <span className='min-w-12'>استان</span>
                    <span className='text-main font-semibold'>{address?.state || 'ثبت نشده'}</span>
                </div>

                <div className='flex items-center gap-5'>
                    <span className='min-w-12'>شهر</span>
                    <span className='text-main font-semibold'>{address?.city || 'ثبت نشده'}</span>
                </div>

                <div className='flex items-center gap-5'>
                    <span className='min-w-12'>آدرس</span>
                    <span className='text-main font-semibold'>{address?.address || 'ثبت نشده'}</span>
                </div>

                <div className='flex items-center gap-5'>
                    <span className='min-w-12'>پلاک</span>
                    <span className='text-main font-semibold'>{address?.houseNumber || 'ثبت نشده'}</span>
                </div>

            </div>

            <button onClick={showModal} className={`${address ? 'hidden' : ''} mt-3 text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 text-sm rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main`} >
                افزودن آدرس
            </button>

            <Modal isModalShow={isModalShow} coverClickhandler={hideModal} >
                <EditAdressModal setAddress={setAddress} hideModal={hideModal} intialAddress={intialAddress} provinces={provinces} />
            </Modal>

        </div>
    )
}

export default AddressInfo