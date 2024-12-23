import { CategoryInterface } from '@/models/Category';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { memo } from 'react'
import { IoIosArrowDown } from "react-icons/io";

type props = {
    categories: CategoryInterface[]
}

const Categories = memo(({ categories }: props) => {

    const pathName = usePathname()
    
    return (
        <div className='group relative'>

            <div className={`${pathName == '/products' || pathName.startsWith('/categories/') || pathName.startsWith('/search/') ? 'text-main' : '' } group-hover:text-main flex items-center cursor-pointer gap-1 transition-colors duration-200`}>
                محصولات
                <IoIosArrowDown />
            </div>

            <div className='absolute transition-all duration-200 opacity-0 invisible group-hover:visible group-hover:opacity-100 top-[110%] rounded-md shadow-md border border-secondary shadow-black p-5 bg-bgColer'>
                <ul className='flex flex-col gap-3'>

                    <li className={`${pathName == `/products`? 'text-main'  : ''} text-nowrap hover:text-main transition-colors duration-200 ml-5`}>
                        <Link href={`/products`}>همه محصولات</Link>
                    </li>
                    {categories.map(cat => (
                        <li key={cat._id.toString()} className={`${pathName == `/categories/${cat.shortName}`? 'text-main'  : ''} text-nowrap hover:text-main transition-colors duration-200 ml-5`}>
                            <Link href={`/categories/${cat.shortName}`}>{cat.name}</Link>
                        </li>
                    ))}


                </ul>
            </div>
        </div>
    )
})

Categories.displayName = 'Categories'

export default Categories