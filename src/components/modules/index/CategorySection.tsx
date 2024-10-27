import React from 'react'
import ProductsSlider from '../../common/ProductsSlider'
import Button from '@/components/common/Button'

type categorySectionProps = {
    title: string
    buttonText: string
}

function CategorySection({title, buttonText}: categorySectionProps) {
    return (
        <section className='mt-16 pb-16 border-b border-secondary'>
            <div className='flex flex-col gap-2 sm:flex-row justify-between mb-5 items-center'>
                <h3 className=' font-bold text-2xl relative before:absolute before:right-0 before:top-0 pr-4 before:bottom-0 before:my-auto before:w-2 before:h-2 before:rounded-full before:bg-main'>
                    {title}
                </h3>
                <Button link href='#' text={buttonText} />
            </div>
            <ProductsSlider />
        </section>
    )
}

export default CategorySection