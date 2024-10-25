"use client"
import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import ProductBox from '@/components/common/ProductBox';

function ProductsSlider() {
    return (
        <Swiper
            modules={[Autoplay, EffectCoverflow]}
            spaceBetween={0}
            slidesPerView={1}
            effect='coverflow'
            coverflowEffect={{
                depth:500,
                rotate:0,
                // scale:1,
                slideShadows: false,
                // stretch: 2
            }}
            loop
            autoplay={{
                delay:1500,
                pauseOnMouseEnter: true
            }}
            breakpoints={{
                550:{
                    slidesPerView: 3,
                    coverflowEffect:{
                        depth:0
                    }
                },
                1024: {
                    slidesPerView: 5,
                    coverflowEffect:{
                        depth:0
                    }
                }
            }}
        >

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

            <SwiperSlide className='!flex !justify-center !px-1.5'>
                <div className='max-w-60'><ProductBox /></div>
            </SwiperSlide>

        </Swiper>
    )
}

export default ProductsSlider