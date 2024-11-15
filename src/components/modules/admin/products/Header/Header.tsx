import Link from 'next/link';
import React from 'react'
import { IoMdAddCircleOutline } from "react-icons/io";
import Categories from './Categories';


function Header() {
    return (
        <div className='mb-5 flex justify-between items-center'>

            <div className='flex w-fit items-center gap-2 bg-main cursor-pointer text-bgColer px-2 md:px-4 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>
                <IoMdAddCircleOutline size={25} />
                <Link href='' className='text-nowrap block' >
                    افزودن محصول
                </Link>
            </div>

            <Categories />

        </div>
    )
}

export default Header