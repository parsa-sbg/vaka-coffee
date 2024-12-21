"use client"
import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import ProductBox from '@/components/common/ProductBox';
import { ProductInterface } from '@/models/Product';


type productsSliderProps = {
    priceGoldColor?: boolean
    products: ProductInterface[]
}

function ProductsSlider({ priceGoldColor, products }: productsSliderProps) {
    return (
        <div className='px-5 md:px-0'>
            <Swiper
                modules={[Autoplay, EffectCoverflow]}
                spaceBetween={0}
                centeredSlides
                slidesPerView={1.6}
                slidesPerGroup={1}
                loop={products.length > 4}
                autoplay={{
                    delay: 1500,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    450: {
                        loop: products.length > 4,
                        slidesPerView: 1.9,
                    },
                    550: {
                        loop: products.length > 4,
                        slidesPerView: 2.5,
                    },
                    640: {
                        loop: products.length > 4,
                        slidesPerView: 2.8,
                    },
                    768: {
                        loop: products.length > 5,
                        slidesPerView: 3.8,
                    },
                    1024: {
                        loop: products.length > 6,
                        slidesPerView: 4.7,
                    },
                    1280: {
                        loop: products.length > 8,
                        slidesPerView: 5.2,
                    },
                }}
            >

                {products.map((product, index) => (
                    <SwiperSlide key={product._id.toString() + index} className='!flex !justify-center !px-2'>
                        <div className='max-w-60'><ProductBox product={product} priceGoldColor={priceGoldColor} /></div>
                    </SwiperSlide>
                ))}
                    {/* <SwiperSlide className='!flex !justify-center !px-2'>
                        <div className='max-w-60'><ProductBox averageScore={products[0].averageScore} shortName={products[0].shortName} imageUrl={products[0].pictures[0]} discount={products[0].discount} name={products[0].name} price={products[0].price} priceGoldColor={priceGoldColor} /></div>
                    </SwiperSlide> */}

            </Swiper>
        </div>

    )
}

export default ProductsSlider