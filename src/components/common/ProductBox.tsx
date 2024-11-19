import toPersionNumber from '@/utils/toPersianNubmer';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

type productBoxProps = {
    priceGoldColor?: boolean
    name: string
    price: number
    discount: number
    imageUrl: string
}


function ProductBox({ priceGoldColor, discount, name, price, imageUrl }: productBoxProps) {

    return (
        <Link href=' ' className='w-full flex flex-col items-center'>

            <div className='max-w-[180px] sm:max-w-[152.5px] md:max-w-[230px]  max-h-[180px] sm:max-h-[152.5px] md:max-h-[230px]  overflow-hidden rounded-md'>
                <Image className=' h-full object-cover' src={imageUrl} alt='product image' width={300} height={300} />
            </div>

            <span className='mt-2 text-sm sm:text-base font-semibold line-clamp-1'>{name}</span>

            <div className='flex items-center gap-1 mt-2'>
                <FaRegStar className='text-main' />
                <FaRegStar className='text-main' />
                <FaStar className='text-[#eabe12]' />
                <FaStar className='text-[#eabe12]' />
                <FaStar className='text-[#eabe12]' />
            </div>

            <div className='flex items-center justify-cneter gap-2 flex-wrap mt-2'>
                {discount ? <span className='line-through text-nowrap text-xs sm:text-sm text-neutral-400'>{toPersionNumber(price.toString())}</span> : ''}
                <span className={`${priceGoldColor ? 'text-[#eabe12]' : 'text-main'} text-sm sm:text-base text-nowrap font-semibold`}>{toPersionNumber((price - (price * discount / 100)).toString()) + ' تومان'}</span>
            </div>

        </Link>
    )
}

export default ProductBox