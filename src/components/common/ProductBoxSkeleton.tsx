import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

function ProductBoxSkeleton() {
    return (
        <div className='w-full flex flex-col items-center animate-pulse'>
            <div className='w-[180px] bg-secondary sm:w-[180px] md:w-[180px] xl:w-[220px]  h-[180px] sm:h-[180px] md:h-[180px] xl:h-[220px]  overflow-hidden rounded-md'>

            </div>

            <span className='mt-2 text-sm sm:text-base font-semibold line-clamp-1 bg-secondary w-26 rounded-md h-6'></span>

            <div className='flex items-center gap-1 mt-2'>
                <FaStar className='text-secondary' />
                <FaStar className='text-secondary' />
                <FaStar className='text-secondary' />
                <FaStar className='text-secondary' />
                <FaStar className='text-secondary' />
            </div>

            <div className='flex items-center justify-cneter h-6 gap-2 flex-wrap mt-2'>
                <span className={`text-sm sm:text-base text-secondary flex gap-1 text-nowrap font-semibold`}>
                    <div className='h-3 w-3 bg-secondary rounded-sm'></div>
                    <div className='h-3 w-3 bg-secondary rounded-sm'></div>
                    <div className='h-3 w-3 bg-secondary rounded-sm'></div>
                    <div className='h-3 w-3 bg-secondary rounded-sm'></div>
                </span>
            </div>
        </div>
    )
}

export default ProductBoxSkeleton