import toPersianNumber from '@/utils/toPersianNubmer'
import Link from 'next/link'
import React from 'react'

type BreadcrumbProps = {
    categoryName: string
    categoryShortName: string
    productName: string
}


function Breadcrumb({ categoryName, categoryShortName, productName }: BreadcrumbProps) {
    return (
        <div className='text-sm'>

            <Link className='opacity-80 transition-opacity duration-200 hover:opacity-100' href='/' >خانه </Link> / <Link className='opacity-80 transition-opacity duration-200 hover:opacity-100' href='/products'>محصولات </Link> / <Link className='opacity-80 transition-opacity duration-200 hover:opacity-100' href={`/categories/${categoryShortName}`}>{categoryName} </Link> / <span className='font-semibold'>{toPersianNumber(productName)}</span>

        </div>
    )
}

export default Breadcrumb