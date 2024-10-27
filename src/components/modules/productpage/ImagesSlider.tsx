"use client"
import React, { useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';


// Import Swiper styles
import 'swiper/css';
import './ImagesSlider.css'
import Image from 'next/image';



function ImagesSlider() {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);


    return (
        <div className='px-5 md:px-0'>
            {/* main slider */}
            <Swiper
                className='w-full'
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={10}
                slidesPerView={1}
            >

                <SwiperSlide className='!flex !justify-center '>
                    <Image className='w-full rounded-md' alt='product image' width={600} height={600} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center '>
                    <Image className='w-full rounded-md' alt='product image' width={600} height={600} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center '>
                    <Image className='w-full rounded-md' alt='product image' width={600} height={600} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center '>
                    <Image className='w-full rounded-md' alt='product image' width={600} height={600} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>


            </Swiper>

            {/* thumb */}
            <Swiper
                onSwiper={setThumbsSwiper}
                // freeMode={true}
                // watchSlidesProgress={true}
                className='mt-3'
                centeredSlides
                modules={[Thumbs]}
                spaceBetween={10}
                slidesPerView={3}
            >

                <SwiperSlide className='!flex !justify-center opacity-50 cursor-pointer'>
                    <Image className='w-full rounded-md' alt='product image' width={300} height={300} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center opacity-50 cursor-pointer'>
                    <Image className='w-full rounded-md' alt='product image' width={300} height={300} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center opacity-50 cursor-pointer'>
                    <Image className='w-full rounded-md' alt='product image' width={300} height={300} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>

                <SwiperSlide className='!flex !justify-center opacity-50 cursor-pointer'>
                    <Image className='w-full rounded-md' alt='product image' width={300} height={300} src='https://vakacoffee.com/wp-content/uploads/2023/03/vaka-products-051604.jpg' quality={100}></Image>
                </SwiperSlide>

            </Swiper>
        </div>

    )
}

export default ImagesSlider