import ProductBoxSkeleton from "@/components/common/ProductBoxSkeleton";
import React from "react";
import { FaStar } from "react-icons/fa";

function loading() {
    return (
        <div className=' mt-16 '>

            <div className='container grid grid-cols-1 sm:grid-cols-12 gap-7 sm:gap-3 md:gap-7'>
                <div className='h-full min-h-56 sm:col-span-5 md:col-span-4 lg:col-span-3'>
                    <div className='px-5 h-full w-full md:px-0'>
                        <div className='w-full h-full max-h-80 sm:max-h-52 xl:max-h-72 bg-secondary animate-pulse rounded-md flex items-center justify-center border border-secondary border-opacity-30'></div>
                    </div>
                </div>

                <div className='sm:col-span-7 md:col-span-8'>
                    <div className='text-sm flex gap-1'>
                        <span className='opacity-80 transition-opacity duration-200 hover:opacity-100' >خانه </span> / <span className='opacity-80 transition-opacity duration-200 hover:opacity-100'>محصولات </span> / <span className='opacity-80 transition-opacity duration-200 hover:opacity-100 w-10 block rounded-md bg-secondary animate-pulse h-5'></span> / <span className='font-semibold h-5 bg-secondary w-20 block rounded-md animate-pulse'></span>
                    </div>

                    <div className='mt-5'>

                        <div className='font-bold text-xl h-7 w-40 rounded-md bg-secondary animate-pulse'></div>

                        <div className='flex items-center gap-2 mt-2'>
                            <div className='flex items-center gap-1'>
                                {Array(5).fill(0).map(item => (
                                    <FaStar key={Math.random()} className='text-secondary animate-pulse' />
                                ))}
                            </div>
                        </div>

                        <div className='flex items-center justify-cneter flex-wrap gap-2 mt-4'>
                            <span className={`text-main text-lg text-nowrap font-semibold h-7 w-32 bg-secondary animate-pulse rounded-md`}></span>
                        </div>

                    </div>

                    <div className=' mt-6'>

                        <div className='flex items-center gap-5'>
                            <div className='flex h-10 w-28 rounded-md bg-secondary animate-pulse'>
                            </div>

                            <div className=''>
                                <div className={`w-28 py-2 px-3 text-sm h-10 rounded-md transition-all duration-300 bg-secondary animate-pulse`}></div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            <div className="mt-16 h-96 rounded-lg bg-secondary animate-pulse"></div>

            <div className="container">
                {Array(2).fill(0).map(() => (
                    <section key={Math.random().toString()} className='mt-16 pb-16 border-b border-secondary'>
                        <div className='flex flex-col gap-2 sm:flex-row justify-between mb-5 items-center'>
                            <div className=' font-bold text-2xl relative before:absolute before:right-0 before:top-0 w-18 before:bottom-0 before:my-auto before:w-2 before:h-2 before:rounded-full before:bg-main'>
                                <span className="mr-5 block w-full h-8 bg-secondary rounded-md animate-pulse"></span>
                            </div>
                            <div className="text-nowrap h-10 w-20 text-bgColer font-semibold px-4 md:px-7 py-2 transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main bg-secondary rounded-md animate-pulse"></div>
                        </div>
                        <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 ">
                            <div className=""><ProductBoxSkeleton /></div>
                            <div className="hidden xs:block"><ProductBoxSkeleton /></div>
                            <div className="hidden sm:block"><ProductBoxSkeleton /></div>
                            <div className="hidden lg:block"><ProductBoxSkeleton /></div>
                            <div className="hidden lg:block"><ProductBoxSkeleton /></div>
                        </div>
                    </section>
                ))}
            </div>


        </div>
    )
}

export default loading;
