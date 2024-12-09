import React from 'react'
import ProductsSlider from '../../common/ProductsSlider'
import Button from '@/components/common/Button'
import { CategoryInterface } from '@/models/Category'

type categorySectionProps = {
    categoryWithProducts: CategoryInterface
}

function CategorySection({ categoryWithProducts }: categorySectionProps) {
    
    return (
        <section className='mt-16 pb-16 border-b border-secondary'>
            <div className='flex flex-col gap-2 sm:flex-row justify-between mb-5 items-center'>
                <h3 className=' font-bold text-2xl relative before:absolute before:right-0 before:top-0 pr-4 before:bottom-0 before:my-auto before:w-2 before:h-2 before:rounded-full before:bg-main'>
                    {categoryWithProducts.name}
                </h3>
                <Button link href={`/categories/${categoryWithProducts.shortName}`} text={categoryWithProducts.name.includes('های') || categoryWithProducts.name.includes('ات') ? `همه ${categoryWithProducts.name}` : `همه ${categoryWithProducts.name} ها` } />
            </div>
            <ProductsSlider products={JSON.parse(JSON.stringify(categoryWithProducts.products)) || []} />
        </section>
    )
}

export default CategorySection