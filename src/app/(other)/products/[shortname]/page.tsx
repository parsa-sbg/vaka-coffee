import Breadcrumb from '@/components/modules/productpage/Breadcrumb'
import React from 'react'

function Product() {
    return (
        <div className='container mt-16 grid grid-cols-1 sm:grid-cols-7 md:grid-cols-6 gap-7 sm:gap-3 md:gap-5'>

            <div className='h-40 bg-red-600 sm:col-span-3 md:col-span-2'>

            </div>

            <div className='h-40  sm:col-span-4 md:col-span-4'>
                <Breadcrumb categoryName=' قهوه ترک' categoryShortName='turkk-coffee' productName='پودر قهوه ترک 500 گرم' />
            </div>

        </div>
    )
}

export default Product 