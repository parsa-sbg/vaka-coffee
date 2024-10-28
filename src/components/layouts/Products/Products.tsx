"use client"

import React, { useState } from 'react'
import ProductsList from './ProductsList/ProductsList'
import Categories from './Categories/Categories'
import Filters from './Filters/Filters'
import { IoClose } from "react-icons/io5";


function Products() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className='grid grid-cols-9 md:grid-cols-12 gap-5'>

            <div className={`${isMenuOpen && '!right-0'} overflow-y-scroll no-scrollbar transition-all duration-300 fixed z-50 sm:z-10 w-full max-w-52 sm:max-w-full bg-bgColer sm:static md:col-span-3 top-0 bottom-0 -right-52 col-span-3 flex flex-col gap-5`}>

                <div className=' py-2 pr-2 sm:hidden flex items-center justify-between bg-green-400'>
                    <span>فیلتر ها</span>
                    <IoClose onClick={() => { setIsMenuOpen(false) }} className='cursor-pointer' size={25} />
                </div>

                <Categories />
                <Filters />
            </div>

            <div className='col-span-9 sm:col-span-6 md:col-span-9'>
                <ProductsList setIsMenuOpen={setIsMenuOpen} />
            </div>

        </div>
    )
}

export default Products