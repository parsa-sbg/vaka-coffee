import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

type boxProps = {
    title: string
    href: string
    Icon: IconType
}

function Box({ title, href, Icon }: boxProps) {
    return (
        <Link href={href} className='bg-[#0f0f0f] hover:text-main border border-secondary hover:border-main h-32 rounded-md flex flex-col transition-all duration-300 items-center justify-center'>
            <Icon className='w-14 h-14' />
            <span className='font-semibold'>{title}</span>
        </Link>
    )
}

export default Box