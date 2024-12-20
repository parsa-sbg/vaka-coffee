import React from 'react'
import ProductsSlider from '../../common/ProductsSlider'
import Button from '@/components/common/Button'
import { ProductInterface } from '@/models/Product'

type props = {
    discountedProducts: ProductInterface[]
}

function SeasionSection({ discountedProducts }: props) {

    const minSlides = 10;
    const products = [...Array(Math.ceil(minSlides / discountedProducts.length))]
        .flatMap(() => discountedProducts)
        .slice(0, minSlides);


    return (
        <section className='mt-16 rounded-2xl bg-main bg-gradient-to-t from-maindark to-[#ffa950] py-5'>

            <h2 className='w-full text-center font-bold text-2xl mt-5 text-bgColer'>تخفیف‌ های قهوه واکا</h2>

            <div className='mt-10'>
                <ProductsSlider products={JSON.parse(JSON.stringify(products))} priceGoldColor />
            </div>

            <div className='flex justify-center mt-5'>
                <Button link={true} href='/off' text='همه تخفیف‌ها' />
            </div>

        </section>
    )
}

export default SeasionSection
