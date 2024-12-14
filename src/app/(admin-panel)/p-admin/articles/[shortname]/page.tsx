import { ArticleModel } from "@/models/Article";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { LuImageOff } from "react-icons/lu";

type props = {
    params: Promise<{ shortname: string }>
}

async function page({ params }: props) {
    const articleShortName = (await params).shortname

    const article = await ArticleModel.findOne({ shortName: articleShortName })
    if (!article) {
        redirect('/')
    }


    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='font-bold text-xl relative pr-3 before:absolute before:w-2 before:h-2 before:rounded-full before:bg-white before:right-0 before:top-0 before:bottom-0 before:my-auto'>مشاهده مقاله</h1>
                <Link href={'/p-admin/articles'} className='flex items-center gap-2'>
                    <span>بازگشت</span>
                    <FaArrowLeft />
                </Link>
            </div>

            <div className='bg-[#0f0f0f] rounded-3xl p-5 my-5 grid grid-cols-5 md:grid-cols-12 gap-5'>

                <div className='grid md:grid-cols-2 xl:grid-cols-1 gap-5 col-span-5 md:col-span-12 xl:col-span-3'>
                    <div className={`flex flex-col gap-1 `}>
                        <h5 className='mb-1 font-semibold transition-all duration-300'>عنوان مقاله</h5>
                        <p className={` transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-secondary`} >
                            {article.title}
                        </p>
                    </div>

                    <div className={`flex flex-col gap-1 `}>
                        <h5 className='mb-1 font-semibold transition-all duration-300'>نام کوتاه</h5>
                        <p className={`transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-secondary`} >
                            {article.shortName}
                        </p>
                    </div>
                </div>

                <div className={`flex flex-col col-span-5 md:col-span-6 xl:col-span-4 gap-1`}>
                    <h5 className='mb-1 font-semibold transition-all duration-300'>توضحات کوتاه</h5>
                    <p className={`min-h-24 break-words h-full resize-none transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-secondary`} >
                        {article.description}
                    </p>
                </div>

                <div className={`flex flex-col gap-4 col-span-5 md:col-span-6 xl:col-span-5`}>
                    <h5 className='mb-1 font-semibold transition-all duration-300'>عکس</h5>

                    <div className='flex items-center justify-evenly'>

                        {article.image
                            ? <div className='w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-41 xl:h-41 rounded-md overflow-hidden'>
                                <Image className='object-cover w-full h-full' width={200} height={200} alt='' src={article.image} ></Image>
                            </div>
                            : <div className='w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-41 xl:h-41 bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
                        }

                    </div>
                </div>


            </div>

            <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>
    )
}
export default page;
