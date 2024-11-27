import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'

function CommetnsTable() {
    return (
        <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

            <thead className="text-xs text-nowrap bg-secondary">
                <tr>
                    <th scope="col" className="px-1 py-3">
                        <span>شماره</span>
                    </th>

                    <th scope="col" className="px-3 lg:px-6 py-3">
                        نویسنده
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        تاریخ
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        وضعیت
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        عملیات
                    </th>
                </tr>
            </thead>

            <tbody>

                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersianNumber('1')}</span>
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پارسا
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersianNumber('1403/08/08')}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-red-500">
                        رد شده
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                تغییر وضعیت
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-secondary">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersianNumber('2')}</span>
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پارسا
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersianNumber('1403/08/08')}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-yellow-500">
                        در حال بررسی
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                تغییر وضعیت
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                حذف
                            </button>

                        </div>
                    </td>
                </tr>

                <tr className="bg-[#0f0f0f]">
                    <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                        <span className='w-full flex justify-center items-center'>{toPersianNumber('3')}</span>
                    </th>
                    <td className="px-3 lg:px-6 py-4">
                        پارسا
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        {toPersianNumber('1403/08/08')}
                    </td>
                    <td className="px-3 lg:px-6 py-4 text-green-500">
                        تایید شده
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                        <div className='flex gap-2 text-xs'>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                مشاهده
                            </button>

                            <button className='text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main' >
                                تغییر وضعیت
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

export default CommetnsTable