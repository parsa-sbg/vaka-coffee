"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function BottomNav() {
    const pathName = usePathname()
    return (
        <nav className='lg:hidden z-40 fixed bottom-0 right-0 left-0 grid grid-cols-6 py-5 border-t border-main  gap-1 bg-bgColer'>


            <Link href='/products' className={`${pathName == '/products' || pathName.startsWith('/categories/') ? 'text-main' : '' } cursor-pointer col-span-2 flex justify-center items-start group border-l`}>
                <span className='group-hover:text-main duration-200 text-nowrap'>محصولات</span>
            </Link>

            <Link href='/off' className={`${pathName.startsWith('/off') ? 'text-main' : ''} cursor-pointer col-span-2 flex justify-center items-start group`}>
                <span className='group-hover:text-main duration-200 text-nowrap'>تخفیف ها🔥</span>
            </Link>

            <Link href='/dashboard' className={`${pathName.startsWith('/dashboard') ? 'text-main' : ''} cursor-pointer col-span-2 flex justify-center items-start border-r group`}>
                <span className='group-hover:text-main duration-200 text-nowrap'>اکانت من</span>
            </Link>

        </nav>
    )
}

export default BottomNav