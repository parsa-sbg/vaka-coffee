import Link from 'next/link'
import React from 'react'

function BreadCrumb() {
    return (
        <div className='text-sm'>
            <Link href='/' className='opacity-80'>خانه</Link> / <span className='font-semibold'>محصولات</span>

        </div>
    )
}

export default BreadCrumb