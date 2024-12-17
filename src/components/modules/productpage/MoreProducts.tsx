import ProductsSlider from '@/components/common/ProductsSlider'
import { ProductInterface } from '@/models/Product'
import React from 'react'

type props = {
    products: ProductInterface[]
}

function MoreProducts({ products }: props) {
    return (
        <div>
            <h3 className='mb-5 mt-16 font-bold text-xl relative before:absolute before:right-0 before:top-0 pr-4 before:bottom-0 before:my-auto before:w-2 before:h-2 before:rounded-full before:bg-main'>
                همچنین ممکن است دوست داشته باشید :
            </h3>
            <ProductsSlider products={JSON.parse(JSON.stringify(products))} />
        </div>
    )
}

export default MoreProducts