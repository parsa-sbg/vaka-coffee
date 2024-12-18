import { CategoryInterface } from '@/models/Category'
import toPersianNumber from '@/utils/toPersianNubmer'
import React from 'react'
import DeleteBtn from './DeleteBtn'
import Image from 'next/image'
import ShowInHomePageCheckBox from './ShowInHomePageCheckBox'

type props = {
    number: number
    isOdd: boolean
    category: CategoryInterface
    editBtnClickhandler: (category: CategoryInterface) => void
    setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>
}

function CategoryItem({ isOdd, category, number, editBtnClickhandler, setCategories }: props) {
    return (
        <tr className={`${isOdd ? 'bg-[#0f0f0f]' : 'bg-secondary'}`}>
            <th scope="row" className="px-1 py-4 font-medium whitespace-nowrap">
                <span className='w-full flex justify-center items-center'>{toPersianNumber(number.toString())}</span>
            </th>
            <td className="px-3 lg:px-6 py-4">
                <Image className='w-14 h-14' alt='' width={200} height={200} src={category.iconUrl} />
            </td>
            <td className="px-3 lg:px-6 py-4">
                {category.name}
            </td>
            <td className="px-3 lg:px-6 py-4">
                {category.shortName}
            </td>
            <td className="px-3 lg:px-6 py-4">
                <div className='flex gap-2 text-xs'>

                    <button onClick={() => { editBtnClickhandler(category) }} className={`text-nowrap bg-main text-bgColer font-semibold px-4 md:px-7 py-2 rounded-md transition-all duration-300 ${!isOdd ? 'sm:hover:bg-[#0f0f0f]' : 'sm:hover:bg-secondary'} sm:hover:text-main`} >
                        ویرایش
                    </button>

                    <DeleteBtn isOdd={isOdd} category={category} setCategories={setCategories} />

                </div>
            </td>

            <td className="">
                <ShowInHomePageCheckBox catName={category.name} catId={category._id} iscategoryShowInHomePageIntial={category.showInHomePage} />
            </td>

        </tr>
    )
}

export default CategoryItem