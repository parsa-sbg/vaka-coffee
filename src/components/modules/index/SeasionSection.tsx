import Image from 'next/image'
import React from 'react'
import ProductsSlider from '../../common/ProductsSlider'
import Button from '@/components/common/Button'

function SeasionSection() {
    return (
        <section className='mt-16 rounded-2xl bg-main bg-gradient-to-t from-maindark to-[#ffa950] py-5'>

            <div className='w-20 h-20 mx-auto -mt-5'>
                <Image width={300} height={300} className='w-full' src='https://vakacoffee.com/wp-content/uploads/2024/09/fallen-leaf_1f342.gif' alt='seasion image'></Image>
            </div>

            <h2 className='w-full text-center font-bold text-2xl mt-5'>پاییز فصل قهوه‌ست!</h2>

            <div className='mt-10'>
                <ProductsSlider priceGoldColor />
            </div>

            <div className='flex justify-center mt-5'>
                <Button link={true} href='/off' text='همه تخفیف‌ها' />
            </div>
            
        </section>
    )
}

export default SeasionSection