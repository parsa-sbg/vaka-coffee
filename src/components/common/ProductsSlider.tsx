"use client"
import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import ProductBox from '@/components/common/ProductBox';


type productsSliderProps = {
    priceGoldColor?: boolean
}

function ProductsSlider({ priceGoldColor }: productsSliderProps) {
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
                    550: {
                        slidesPerView: 3.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    1024: {
                        slidesPerView: 5.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    }
                }}
            >

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center !px-2'>
                    <div className='max-w-60'><ProductBox priceGoldColor={priceGoldColor} /></div>
                </SwiperSlide>

            </Swiper>
        </div>

    )
}

export default ProductsSlider