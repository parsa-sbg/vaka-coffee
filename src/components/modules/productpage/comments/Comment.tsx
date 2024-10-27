import toPersionNumber from '@/utils/toPersianNubmer'
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

function Comment() {
    return (
        <div className='pb-8 mb-8 border-b border-secondary'>

            <div className='flex items-center justify-between'>
                <div>
                    <span className='font-semibold'>زهرا خانلو</span>
                    <span className='opacity-80'> (خریدار محصول) –</span>
                    <span className='opacity-80'>{toPersionNumber('1403/07/29')}</span>
                </div>
                <div className='flex items-center'>
                    <FaStar className='text-[#eabe12]' />
                    <FaStar className='text-[#eabe12]' />
                    <FaStar className='text-[#eabe12]' />
                    <FaRegStar className='text-main' />
                    <FaRegStar className='text-main' />
                </div>
            </div>

            <p className='mt-8 opacity-80'>
                باسلام ممنون از زحمات شما از سفارشم راضی بودم ولی در سفارش بعدی تقاضا میکنم که رست قهوه کمتر باشد با تشکر.
            </p>

        </div>
    )
}

export default Comment