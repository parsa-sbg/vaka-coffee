import React from "react";
import Header from "@/components/modules/index/Header";
import { categoryModel, connectToDataBase } from "@/models";
import ProductBoxSkeleton from "@/components/common/ProductBoxSkeleton";


async function loading() {

    connectToDataBase()
    const categoriescount = await categoryModel.countDocuments()

    return (
        <div className="">

            <div className="container">

                <div className="container">
                    <Header />
                </div>

                <section className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 lg:max-w-[1000px] lg:mx-auto gap-5 mt-10 justify-items-center place-items-center'>

                    {Array(categoriescount).fill(0).map(() => (
                        <div key={Math.random().toString()} className='h-full flex flex-col col-span-1 w-full gap-5 items-center justify-center hover:scale-105 border-secondary transition-all duration-200 hover:border-main rounded-md shadow-xl shadow-black border p-5 xs:p-3 sm:p-5'>
                            <div className='max-w-12 max-h-12 md:max-w-16 md:max-h-16 h-[2000px] w-[2000px] rounded-md bg-secondary animate-pulse'></div>
                            <span className='text-center h-5 bg-secondary animate-pulse w-full'></span>
                        </div>
                    ))}

                </section>

                {Array(3).fill(0).map(() => (
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

            <section className='my-16 py-20 bg-secondary animate-pulse flex items-center justify-center md:justify-start bg-[url(/banner.jpg)] object-fill bg-cover bg-no-repeat'>
                <div className='max-w-52 sm:max-w-64 md:max-w-80 md:mr-10'>
                </div>
            </section>
        </div>
    )
}

export default loading;
