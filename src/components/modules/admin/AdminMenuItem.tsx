"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type AdminMenuItemProps = {
    text: string
    href: string
}

function AdminMenuItem({ text, href }: AdminMenuItemProps) {

    const pathName = usePathname()
    
    return (
        <li>
            <Link
                href={href}
                className={`${pathName == href && 'bg-[#0f0f0f] text-main'} block py-2 px-4 rounded-md transition-all duration-200 hover:bg-[#0f0f0f] hover:text-main`}>
                {text}
            </Link>
        </li>
    )
}

export default AdminMenuItem