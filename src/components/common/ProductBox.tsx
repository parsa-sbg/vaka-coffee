import toPersianNumber from '@/utils/toPersianNubmer';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { LuImageOff } from 'react-icons/lu';

type productBoxProps = {
    priceGoldColor?: boolean
    name: string
    shortName: string
    price: number
    discount: number
    imageUrl: string
}


function ProductBox({ priceGoldColor, discount, name, price, imageUrl, shortName }: productBoxProps) {

    return (
        <Link href={`/products/${shortName}`} className='w-full flex flex-col items-center'>

            <div className='w-[180px] relative sm:w-[180px] md:w-[180px] xl:w-[220px]  h-[180px] sm:h-[180px] md:h-[180px] xl:h-[220px]  overflow-hidden rounded-md'>
                {imageUrl
                    ? <Image className=' h-full object-cover' src={imageUrl} alt='product image' quality={60} width={300} height={300} />
                    : <div className='w-full h-full bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={60} className='text-main' /></div>

                }
                {discount ? <span dir='ltr' className='absolute block bottom-2.5 right-2.5 bg-main text-sm p-1 rounded-md'>-{discount}%</span> : ''}

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
                {discount ? <span className='line-through text-nowrap text-xs sm:text-sm text-neutral-400'>{toPersianNumber(price.toString())}</span> : ''}
                <span className={`${priceGoldColor ? 'text-[#eabe12]' : 'text-main'} text-sm sm:text-base text-nowrap font-semibold`}>{toPersianNumber((price - (price * discount / 100)).toString()) + ' تومان'}</span>
            </div>

        </Link>
    )
}

export default ProductBox