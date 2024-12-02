"use client"
import { FaArrowLeftLong } from "react-icons/fa6";


import { usePathname } from 'next/navigation'
import React from 'react'
import Link from "next/link";

function Header() {
    const pathName = usePathname()
    console.log(pathName);

    return (
        <div className='bg-[#0f0f0f] py-10 my-10 flex justify-center items-center gap-5'>

            <Link className={`${pathName == '/cart' ? 'text-main font-semibold !border-main' : ''} border-b border-transparent transition-colors duration-300 sm:hover:text-main`} href={'/cart'} >سبد خرید</Link>

            <FaArrowLeftLong size={20} />
            
            <Link className={`${pathName == '/checkout' ? 'text-main font-semibold !border-main' : ''} border-b border-transparent transition-colors duration-300 sm:hover:text-main`} href={'/checkout'} >پرداخت</Link>
            
            <FaArrowLeftLong size={20} />
            
            <span>تکمیل سفارش</span>
        
        </div>
    )
}

export default Header