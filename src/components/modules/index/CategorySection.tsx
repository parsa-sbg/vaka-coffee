import React from 'react'
import ProductsSlider from '../../common/ProductsSlider'
import Button from '@/components/common/Button'
import { CategoryInterface } from '@/models/Category'
import { productmodel } from '@/models/Product'

type categorySectionProps = {
    category: CategoryInterface
}

async function CategorySection({ category }: categorySectionProps) {

    let products = await productmodel.find({ category: category._id, stock: { $gt: 0 } }).limit(10)


    if (products.length < 10 && products.length) {
        const minSlides = 10;
        products = [...Array(Math.ceil(minSlides / products.length))]
            .flatMap(() => products)
            .slice(0, minSlides);
    }

    return (
        <section className='mt-16 pb-16 border-b border-secondary'>
            <div className='flex flex-col gap-2 sm:flex-row justify-between mb-5 items-center'>
                <h3 className=' font-bold text-2xl relative before:absolute before:right-0 before:top-0 pr-4 before:bottom-0 before:my-auto before:w-2 before:h-2 before:rounded-full before:bg-main'>
                    {category.name}
                </h3>
                <Button link href={`/categories/${category.shortName}`} text={category.name.includes('های') || category.name.includes('ات') ? `همه ${category.name}` : `همه ${category.name} ها`} />
            </div>
            <ProductsSlider products={JSON.parse(JSON.stringify(products))} />
        </section>
    )
}

export default CategorySection