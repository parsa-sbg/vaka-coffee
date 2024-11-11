import { UserInterface } from '@/models/User'
import toPersionNumber from '@/utils/toPersianNubmer'
import React from 'react'

type props = {
    isOdd: boolean
    admin: UserInterface
    number: number
}

function AdminItem({ isOdd, number, admin }: props) {
    return (
        <tr className={`${isOdd ? 'bg-secondary' : 'bg-[#0f0f0f]'}`}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersionNumber(number.toString())}</span>
            </th>
            <td className="px-3 lg:px-6 py-4">
                {admin.name}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {admin.username}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {toPersionNumber(admin.phone)}
            </td>

            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs'>

                    <button className={`text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 ${isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'}  sm:hover:text-main`} >
                        مشاهده
                    </button>

                    <button className={`text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 ${isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'}  sm:hover:text-main`} >
                        حذف ادمین
                    </button>

                    <button className={`text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 ${isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'}  sm:hover:text-main`} >
                        حذف
                    </button>

                </div>
            </td>
        </tr>
    )
}

export default AdminItem