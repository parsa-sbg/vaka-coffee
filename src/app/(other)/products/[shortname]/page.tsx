import AddToCart from '@/components/modules/productpage/AddToCart'
import Breadcrumb from '@/components/modules/productpage/Breadcrumb'
import Details from '@/components/modules/productpage/Details'
import React from 'react'

function Product() {
    return (
        <div className='container mt-16 grid grid-cols-1 sm:grid-cols-7 md:grid-cols-6 gap-7 sm:gap-3 md:gap-5'>

            <div className='h-full min-h-56 bg-red-600 sm:col-span-3 md:col-span-2'>

            </div>

            <div className='sm:col-span-4 md:col-span-4'>
                <Breadcrumb categoryName=' قهوه ترک' categoryShortName='turkk-coffee' productName='پودر قهوه ترک 500 گرم' />
                <Details title='پودر قهوه ترک 500 گرم' commentsCount={3} score={3} price={465_000} dynamicFields={[{ key: 'ترکیب قهوه', value: '100 روبوستا' }, { key: 'میزان کافنین', value: 'کافئین خیلی بالا' }, { key: 'رست', value: 'مدیوم' }]} />
                <AddToCart />
            </div>

        </div>
    )
}

export default Product 