import toPersionNumber from '@/utils/toPersianNubmer'
import Image from 'next/image'
import React from 'react'

type props = {
    isOdd: boolean
}

function ProductItem({ isOdd }: props) {
    return (
        <tr className={`${isOdd ? 'bg-[#0f0f0f]' : 'bg-secondary'}`}>
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
    )
}

export default ProductItem