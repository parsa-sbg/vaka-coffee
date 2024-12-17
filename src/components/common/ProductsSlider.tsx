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
                slidesPerView={1.5}
                centeredSlides
                slidesPerGroupAuto
                loop={products.length > 5}
                autoplay={{
                    delay: 1500,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    640: {
                        loop: products.length > 5,
                        slidesPerView: 2.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    768: {
                        loop: products.length > 8,
                        slidesPerView: 3.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    1024: {
                        loop: products.length > 10,
                        slidesPerView: 4.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    1280: {
                        loop: products.length > 10,
                        slidesPerView: 5.2,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                }}
            >

                {products.map(product => (
                    <SwiperSlide key={product._id.toString()} className='!flex !justify-center !px-2'>
                        <div className='max-w-60'><ProductBox averageScore={product.averageScore} shortName={product.shortName} imageUrl={product.pictures[0]} discount={product.discount} name={product.name} price={product.price} priceGoldColor={priceGoldColor} /></div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>

    )
}

export default ProductsSlider