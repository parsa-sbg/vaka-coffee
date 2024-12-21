import { ProductInterface } from '@/models/Product';
import toPersianNumber from '@/utils/toPersianNubmer';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { LuImageOff } from 'react-icons/lu';

type productBoxProps = {
    priceGoldColor?: boolean
    product: ProductInterface
}


function ProductBox({ priceGoldColor, product }: productBoxProps) {

    const { averageScore = 5, discount, shortName, pictures, price, name } = product

    return (
        <Link href={`/products/${shortName}`} className='w-full flex flex-col items-center'>

            <div className='w-[150px] h-[150px] xs:w-[180px] relative sm:w-[180px] md:w-[180px] xl:w-[220px]  xs:h-[180px] sm:h-[180px] md:h-[180px] xl:h-[220px]  overflow-hidden rounded-md'>
                {pictures[0]
                    ? <Image className=' h-full object-cover' src={pictures[0]} alt='product image' quality={60} width={300} height={300} />
                    : <div className='w-full h-full bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={60} className='text-main' /></div>

                }
                {discount && product.stock ? <span dir='ltr' className='absolute block bottom-2.5 right-2.5 bg-main text-sm p-1 rounded-md'>-{discount}%</span> : ''}
                {!product.stock ? <span dir='ltr' className='absolute block bottom-2.5 right-2.5 bg-red-700 text-sm p-1 rounded-md'>ناموجود</span> : ''}

            </div>

            <span className='mt-2 text-sm sm:text-base font-semibold line-clamp-1'>{toPersianNumber(name)}</span>

            <div className='flex items-center gap-1 mt-2'>
                {Array(5 - Math.ceil(averageScore)).fill(0).map(item => (
                    <FaRegStar key={Math.random()} className='text-main' />
                ))}
                 {Array(Math.ceil(averageScore)).fill(0).map(item => (
                    <FaStar key={Math.random()} className='text-[#eabe12]' />
                ))}
            </div>

            <div className='flex items-center justify-cneter gap-2 flex-wrap mt-2'>
                {discount ? <span className='line-through text-nowrap text-xs sm:text-sm text-neutral-400'>{toPersianNumber(price.toLocaleString())}</span> : ''}
                <span className={`${priceGoldColor ? 'text-[#eabe12]' : 'text-main'} text-sm sm:text-base text-nowrap font-semibold`}>{toPersianNumber((price - (price * discount / 100)).toLocaleString()) + ' تومان'}</span>
            </div>

        </Link>
    )
}

export default ProductBox