import toPersionNumber from '@/utils/toPersianNubmer'
import React from 'react'

function UsersTable() {
    return (
        <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

            <thead className="text-xs text-nowrap bg-secondary">
                <tr>
                    <th scope="col" className="px-1 py-3">
                        <span>شماره</span>
                    </th>

                    <th scope="col" className="px-3 lg:px-6 py-3">
                        نام
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        شماره تماس
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
                    <td className="px-3 lg:px-6 py-4">
                        پارسا
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('09123456789')}
                    </td>

                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('2')}</span>
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پارسا
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('09123456789')}
                    </td>

                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersionNumber('3')}</span>
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پارسا
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersionNumber('09123456789')}
                    </td>

                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
    )
}

export default UsersTable