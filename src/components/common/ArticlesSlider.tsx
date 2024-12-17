"use client"
import { ArticleInterface } from "@/models/Article";
import React from "react";
import 'swiper/css';
import ArticleBox from "./ArticleBox";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { EffectCoverflow } from 'swiper/modules';

type props = {
    articles: ArticleInterface[]
}

function ArticlesSlider({ articles }: props) {
    return (
        <div className='px-5 md:px-0'>
            <Swiper
                modules={[Autoplay, EffectCoverflow]}
                spaceBetween={0}
                slidesPerView={1.2}
                loop={articles.length >= 5}
                centeredSlides
                slidesPerGroupAuto
                autoplay={{
                    delay: 1500,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    640: {
                        loop: articles.length >= 5,
                        slidesPerView: 2.2,
                        coverflowEffect: {
                            depth: 0
                        },
                    },
                    768: {
                        loop: articles.length >= 9,
                        slidesPerView: 2.8,
                        coverflowEffect: {
                            depth: 0
                        },
                    },
                    1024: {
                        loop: articles.length >= 11,
                        slidesPerView: 3.5,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                    1280: {
                        loop: articles.length >= 14,
                        slidesPerView: 4.2,
                        coverflowEffect: {
                            depth: 0
                        }
                    },
                }}
            >

                {articles.map(article => (
                    <SwiperSlide key={article._id.toString()} className='!flex !justify-center !px-2'>
                        <div className='max-w-48 xs:max-w-60 lg:max-w-80'><ArticleBox article={article} /></div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}

export default ArticlesSlider;
