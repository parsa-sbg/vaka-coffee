import toPersionNumber from '@/utils/toPersianNubmer';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

type productBoxProps = {
    priceGoldColor?: boolean
}


function ProductBox({ priceGoldColor }: productBoxProps) {

    return (
        <Link href=' ' className='w-full flex flex-col items-center'>

            <Image className='w-full rounded-md' src='https://vakacoffee.storage.c2.liara.space/Untitled.png?AWSAccessKeyId=qntsumvcd1ien623&Expires=1763411479&Signature=SrhQNSoQXlf4w4JieWa7pJV0QWg%3D' alt='product image' width={300} height={300} />

            <span className='mt-2 font-semibold'>پودر قهوه ترک 5 کیلوگرم</span>

            <div className='flex items-center gap-1 mt-2'>
                <FaStar className='text-[#eabe12]' />
                <FaStar className='text-[#eabe12]' />
                <FaStar className='text-[#eabe12]' />
                <FaRegStar className='text-main' />
                <FaRegStar className='text-main' />
            </div>

            <div className='flex items-center justify-cneter flex-wrap gap-2 mt-2'>
                <span className='line-through text-nowrap text-sm text-neutral-400'>{toPersionNumber('565,750')}</span>
                <span className={`${priceGoldColor ? 'text-[#eabe12]' : 'text-main'}  text-nowrap font-semibold`}>{toPersionNumber('365,750 تومان')}</span>
            </div>

        </Link>
    )
}

export default ProductBox