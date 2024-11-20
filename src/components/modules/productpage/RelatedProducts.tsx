import ProductsSlider from '@/components/common/ProductsSlider'
import React from 'react'

function RelatedProducts() {
    return (
        <div>
            <h3 className='mb-5 mt-16 font-bold text-xl relative before:absolute before:right-0 before:top-0 pr-4 before:bottom-0 before:my-auto before:w-2 before:h-2 before:rounded-full before:bg-main'>
                محصولات مرتبط
            </h3>
            <ProductsSlider products={JSON.parse(JSON.stringify([]))} />
        </div>
    )
}

export default RelatedProducts