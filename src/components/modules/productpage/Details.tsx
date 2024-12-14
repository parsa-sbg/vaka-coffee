import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

type detailsPros = {
    title: string
    commentsCount: number
    price: number
    discount: number
    dynamicFields: { key: string, value: string }[]
    averageScore: number
}

function Details({ title, commentsCount, dynamicFields, price, averageScore, discount }: detailsPros) {
    console.log(averageScore);

    return (
        <div className='mt-5'>

            <h1 className='font-bold text-xl'>{title}</h1>

            <div className='flex items-center gap-2 mt-2'>
                <div className='flex items-center gap-1'>
                    {Array(Math.ceil(averageScore)).fill(0).map(item => (
                        <FaStar key={Math.random()} className='text-[#eabe12]' />
                    ))}
                    {Array(5 - Math.ceil(averageScore)).fill(0).map(item => (
                        <FaRegStar key={Math.random()} className='text-main' />
                    ))}
                </div>
                <span className='text-xs opacity-80'> (دیدگاه {toPersianNumber(commentsCount.toString())} کاربر)</span>
            </div>

            <div className='flex items-center justify-cneter flex-wrap gap-2 mt-4'>
                <span className={`${!discount ? '!hidden' : ''} line-through text-nowrap text-neutral-400`}>{toPersianNumber(price.toLocaleString())}</span>
                <span className={`text-main text-lg text-nowrap font-semibold`}>{toPersianNumber((price - (price * discount / 100)).toLocaleString())} تومان</span>
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