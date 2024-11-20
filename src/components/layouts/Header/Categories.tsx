import { categoryModel, connectToDataBase } from '@/models';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowDown } from "react-icons/io";


async function Categories() {

    await connectToDataBase()
    const categories = await categoryModel.find()

    return (
        <div className='group relative'>

            <div className='group-hover:text-main flex items-center cursor-pointer gap-1 transition-colors duration-200'>
                محصولات
                <IoIosArrowDown />
            </div>

            <div className='absolute transition-all duration-200 opacity-0 invisible group-hover:visible group-hover:opacity-100 top-[110%] rounded-md shadow-md border border-secondary shadow-black p-5 bg-bgColer'>
                <ul className='flex flex-col gap-3'>

                    {categories.map(cat => (
                        <li key={cat._id.toString()} className='text-nowrap hover:text-main transition-colors duration-200 ml-5'>
                            <Link href={`/categories/${cat.shortName}`}>{cat.name}</Link>
                        </li>
                    ))}


                </ul>
            </div>
        </div>
    )
}

export default Categories