import toPersionNumber from '@/utils/toPersianNubmer'
import Image from 'next/image'
import React from 'react'

function ProductsTable() {
    return (
        <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

            <thead className="text-xs text-nowrap bg-secondary">
                <tr>
                    <th scope="col" className="px-1 py-3">
                        <span>شماره</span>
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        عکس
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        نام
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        دسته بندی
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        قیمت
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        عملیات
                    </th>
                </tr>
            </thead>

            <tbody>



                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('1')}</span>
                    </th>
                    <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                        <Image className='w-20 h-20 min-w-20' alt='products image' width={500} height={500} src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604.jpg' />
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پودر قهوه ترک 5 کیلوگرم
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        قهوه ترک
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('250,000 تومان')}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                ویرایش
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-secondary">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('2')}</span>
                    </th>
                    <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                        <Image className='w-20 h-20 min-w-20' alt='products image' width={500} height={500} src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604.jpg' />
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پودر قهوه ترک 5 کیلوگرم
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        قهوه ترک
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('250,000 تومان')}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                ویرایش
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('3')}</span>
                    </th>
                    <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                        <Image className='w-20 h-20 min-w-20' alt='products image' width={500} height={500} src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604.jpg' />
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پودر قهوه ترک 5 کیلوگرم
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        قهوه ترک
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('250,000 تومان')}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                ویرایش
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-secondary">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('4')}</span>
                    </th>
                    <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                        <Image className='w-20 h-20 min-w-20' alt='products image' width={500} height={500} src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604.jpg' />
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پودر قهوه ترک 5 کیلوگرم
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        قهوه ترک
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('250,000 تومان')}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                ویرایش
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('5')}</span>
                    </th>
                    <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                        <Image className='w-20 h-20 min-w-20' alt='products image' width={500} height={500} src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604.jpg' />
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پودر قهوه ترک 5 کیلوگرم
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        قهوه ترک
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('250,000 تومان')}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                ویرایش
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-secondary">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('6')}</span>
                    </th>
                    <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                        <Image className='w-20 h-20 min-w-20' alt='products image' width={500} height={500} src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604.jpg' />
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پودر قهوه ترک 5 کیلوگرم
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        قهوه ترک
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('250,000 تومان')}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                ویرایش
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('7')}</span>
                    </th>
                    <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                        <Image className='w-20 h-20 min-w-20' alt='products image' width={500} height={500} src='https://vakacoffee.com/wp-content/uploads/2024/02/vaka-products-051604.jpg' />
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پودر قهوه ترک 5 کیلوگرم
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        قهوه ترک
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('250,000 تومان')}
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                ویرایش
                            </button>

                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    )
}

export default ProductsTable