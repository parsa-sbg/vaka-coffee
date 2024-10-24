import Link from 'next/link'
import React from 'react'

function AllCategories() {
    return (
        <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 lg:max-w-[1000px] lg:mx-auto gap-5 mt-10 justify-items-center place-items-center'>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2023/09/blendedicon.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>ترکیب‌های پرطرفدار</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2023/09/arabicaicon-1.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>قهوه عربیکا</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2023/09/robustaicon.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>قهوه روبوستا</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2023/09/instanticon.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>قهوه فوری</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2023/03/FRENCH-PRESS.svg' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>قهوه فرانسه</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2024/02/turkish-min.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>قهوه ترک</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2024/02/grinder-min.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>تجهیزات و اکسسوری</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2023/09/portafilter.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>لوازم جانبی اسپرسوساز</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2023/09/accessoryicon.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>دستگاه قهوه‌ساز</span>
            </Link>

            <Link href='#' className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5'>
                <img className='max-w-12 md:max-w-16' src='https://vakacoffee.com/wp-content/uploads/2024/08/gift-card_1692703-min.png' alt='category icon' width={200} height={200} ></img>
                <span className='text-center text-sm'>واکا کارت</span>
            </Link>

            
        </div>
    )
}

export default AllCategories