"use client"

import AddToCart from '@/components/modules/productpage/AddToCart'
import Breadcrumb from '@/components/modules/productpage/Breadcrumb'
import Content from '@/components/modules/productpage/Content'
import Details from '@/components/modules/productpage/Details'
import ImagesSlider from '@/components/modules/productpage/ImagesSlider'
import React from 'react'

function Product() {
    return (
        <div className=' mt-16 '>

            <div className='container grid grid-cols-1 sm:grid-cols-7 gap-7 sm:gap-3 md:gap-7'>
                <div className='h-full min-h-56 sm:col-span-2 md:col-span-2'>
                    <ImagesSlider />
                </div>

                <div className='sm:col-span-5 md:col-span-5'>
                    <Breadcrumb categoryName=' قهوه ترک' categoryShortName='turkk-coffee' productName='پودر قهوه ترک 500 گرم' />
                    <Details title='پودر قهوه ترک 500 گرم' commentsCount={3} score={3} price={465_000} dynamicFields={[{ key: 'ترکیب قهوه', value: '100 روبوستا' }, { key: 'میزان کافنین', value: 'کافئین خیلی بالا' }, { key: 'رست', value: 'مدیوم' }, { key: 'وزن', value: '250 گرم' }]} />
                    <AddToCart />
                </div>
            </div>

            <div className='mt-16'>
                <Content />
            </div>

        </div>
    )
}

export default Product 