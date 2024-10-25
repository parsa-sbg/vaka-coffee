import toPersionNumber from '@/utils/toPersianNubmer';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";



function ProductBox() {

    return (
        <Link href=' ' className='w-full flex flex-col items-center'>

            <Image className='w-full rounded-md' src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604-1024x1024.jpg' alt='product image' width={300} height={300} />

            <span className='mt-2 font-semibold'>پودر قهوه ترک 5 کیلوگرم</span>

            <div className='flex items-center gap-1 mt-2'>
                <FaStar className='text-[#eabe12]' />
                <FaStar className='text-[#eabe12]' />
                <FaStar className='text-[#eabe12]' />
                <FaRegStar className='text-main' />
                <FaRegStar className='text-main' />
            </div>

            <div className='flex items-center justify-cneter flex-wrap gap-2 mt-2'>
                <span className='line-through text-nowrap text-sm text-secondary'>{toPersionNumber('565,750')}</span>
                <span className='text-main text-nowrap font-semibold'>{toPersionNumber('365,750 تومان')}</span>
            </div>

        </Link>
    )
}

export default ProductBox