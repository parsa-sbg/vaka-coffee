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
                loop
                autoplay={{
                    delay: 1500,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    768: {
                        slidesPerView: 3.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    1024: {
                        slidesPerView: 4.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    1280: {
                        slidesPerView: 5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                }}
            >

                {products.map(product => (
                    <SwiperSlide key={product._id.toString()} className='!flex !justify-center !px-2'>
                        <div className='max-w-60'><ProductBox imageUrl={product.pictures[0]} discount={product.discount} name={product.name} price={product.price} priceGoldColor={priceGoldColor} /></div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>

    )
}

export default ProductsSlider