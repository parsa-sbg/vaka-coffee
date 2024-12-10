import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'
import { LuImageOff } from 'react-icons/lu'

type props = {
    isOdd: boolean
    number: number
}

function ArticlesItem({ isOdd, number }: props) {
    return (
        <tr className={`${isOdd ? 'bg-[#0f0f0f]' : 'bg-secondary'}`}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersianNumber(number.toString())}</span>
            </th>
            <th scope="row" className="px-3 lg:px-6 py-4 font-medium whitespace-nowrap">
                {/* {product.pictures[0] */}
                {/* ? <Image className='w-20 h-20 min-w-20 rounded-md' alt='products image' width={500} height={500} src={product.pictures[0]} /> */}
                {/* : */}
                <div className='w-20 h-20 bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
                {/* } */}
            </th>
            <td className="px-3 lg:px-6 py-4">
                عنوان
            </td>
            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs'>

                    <button className={`${!isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'} text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:text-main`} >
                        مشاهده
                    </button>

                    <button className={`${!isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'} text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:text-main`} >
                        ویرایش
                    </button>

                    <button className={`${!isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'} text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 sm:hover:text-main`} >
                        حذف
                    </button>

                </div>
            </td>
        </tr>
    )
}

export default ArticlesItem