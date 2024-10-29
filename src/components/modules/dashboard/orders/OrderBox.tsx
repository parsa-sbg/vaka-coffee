"use client"
import Button from '@/components/common/Button'
import toPersionNumber from '@/utils/toPersianNubmer'
import React from 'react'

function OrderBox() {
    return (
        <div className='flex flex-col gap-3 pt-7'>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>سفارش</span>
                <span className='text-nowrap  text-xs sm:text-sm md:text-base'>#65823</span>
            </div>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>تاریخ</span>
                <span className='text-nowrap  text-xs sm:text-sm md:text-base'>1403/08/08</span>
            </div>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>وضعیت</span>
                <span className='text-nowrap  text-xs sm:text-sm md:text-base'>در انتظار پرداخت</span>
            </div>

            <div className='flex items-center justify-between'>
                <span className='text-nowrap text-xs sm:text-sm md:text-base'>مبلغ کل</span>
                <span className='text-nowrap text-main text-xs sm:text-sm md:text-base'>{toPersionNumber('765,000 تومان')}</span>
            </div>

            <div className='flex items-center justify-end'>
                <div className='flex items-center flex-wrap gap-1 justify-end'>
                    <div className='text-xs'><Button link={false} callback={() => {}} text='پرداخت' /></div>
                    <div className='text-xs'><Button link={false} callback={() => {}} text='نمایش' /></div>
                    <div className='text-xs'><Button link={false} callback={() => {}} text='لغو' /></div>
                </div>

            </div>

        </div>
    )
}

export default OrderBox