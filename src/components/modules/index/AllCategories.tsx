import { CategoryInterface } from '@/models/Category'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type props = {
    allCats: CategoryInterface[]
}

function AllCategories({ allCats }: props) {
    return (
        <section className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 lg:max-w-[1000px] lg:mx-auto gap-5 mt-10 justify-items-center place-items-center'>

            {allCats.map(cat => (
                <Link key={cat._id.toString()} href={`/categories/${cat.shortName}`} className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5 xs:p-3 sm:p-5'>
                    <Image className='max-w-12 md:max-w-16' src={cat.iconUrl} alt='category icon' width={200} height={200} ></Image>
                    <span className='text-center text-sm'>{cat.name}</span>
                </Link>
            ))}

        </section>
    )
}

export default AllCategories