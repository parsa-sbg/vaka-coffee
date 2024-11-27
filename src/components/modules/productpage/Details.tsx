import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

type detailsPros = {
    title: string
    score: number
    commentsCount: number
    price: number
    off?: number
    dynamicFields: { key: string, value: string }[]
}

function Details({ title, commentsCount, dynamicFields }: detailsPros) {
    return (
        <div className='mt-5'>

            <h1 className='font-bold text-xl'>{title}</h1>

            <div className='flex items-center gap-2 mt-2'>
                <div className='flex items-center gap-1'>
                    <FaStar className='text-[#eabe12]' />
                    <FaStar className='text-[#eabe12]' />
                    <FaStar className='text-[#eabe12]' />
                    <FaRegStar className='text-main' />
                    <FaRegStar className='text-main' />
                </div>
                <span className='text-xs opacity-80'> (دیدگاه {toPersianNumber(commentsCount.toString())} کاربر)</span>
            </div>

            <div className='flex items-center justify-cneter flex-wrap gap-2 mt-4'>
                <span className='line-through text-nowrap text-neutral-400'>{toPersianNumber('565,750')}</span>
                <span className={`text-main text-lg text-nowrap font-semibold`}>{toPersianNumber('365,750 تومان')}</span>
            </div>

            <div className='mt-8'>
                {dynamicFields.map(field => (
                    <div key={Math.random()} className='flex items-center text-sm gap-5 pb-2 mb-2 border-b border-dashed border-secondary '>
                        <span className='text-main'>{field.key}</span>
                        <span className='opacity-80'>{toPersianNumber(field.value)}</span>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default Details