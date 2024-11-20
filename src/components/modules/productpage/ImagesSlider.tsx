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


type props = {
    picturesUrl: string[]
}


function ImagesSlider({ picturesUrl }: props) {

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

                {picturesUrl.map(url => (
                    <SwiperSlide key={url} className='!flex !justify-center '>
                        <Image priority className='w-full rounded-md' alt='product image' width={600} height={600} src={url} quality={70}></Image>
                    </SwiperSlide>
                ))}


            </Swiper>

            {/* thumb */}
            {picturesUrl.length > 1 &&
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

                    {picturesUrl.map(url => (
                        <SwiperSlide key={url} className='!flex !justify-center opacity-50 cursor-pointer'>
                            <Image priority className='w-full rounded-md' alt='product image' width={300} height={300} src={url} quality={50}></Image>
                        </SwiperSlide>
                    ))}

                </Swiper>}
        </div>

    )
}

export default ImagesSlider