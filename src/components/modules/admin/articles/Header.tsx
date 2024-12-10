import Link from 'next/link'
import React from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'

function Header() {
    return (
        <div className='mb-5 flex justify-between items-center'>
            <Link href={'/p-admin/articles/new'} className='flex w-fit text-nowrap items-center gap-2 bg-main text-bgColer px-2 md:px-4 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>
                <IoMdAddCircleOutline size={25} />
                افزودن مقاله
            </Link>
        </div>
    )
}

export default Header