import { ArticleModel } from "@/models/Article";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type props = {
    params: Promise<{ shortname: string }>
}

const page = async ({ params }: props) => {
    const { shortname: shortName } = await params
    const article = await ArticleModel.findOne({ shortName })
    if (!article) {
        redirect('/articles')
    }

    return (
        <div className='container mt-8'>

            <div className='flex justify-center flex-col items-center gap-3 mb-10'>
                <h1 className='font-bold text-2xl text-center text-main '>باشگاه مشتریان واکا</h1>
                <div className="flex gap-1 text-sm text-nowrap flex-wrap justify-center">
                    <Link className='opacity-80 transition-opacity duration-200 hover:opacity-100' href='/' >خانه </Link> / <Link className='opacity-80 transition-opacity duration-200 hover:opacity-100' href='/articles'>باشگاه مشتریان </Link> / <span className='opacity-80 transition-opacity duration-200 hover:opacity-100'>{article.title}</span>
                </div>
            </div>

            <div className="md:mx-20 xl:mx-40 border border-secondary rounded-xl p-5" dangerouslySetInnerHTML={{ __html: article.content }}></div>


        </div>
    )
}

export default page;


export const revalidate = 120

export async function generateMetadata({ params }: props) {

    const { shortname: shortName } = await params
    const article = await ArticleModel.findOne({ shortName })
    if (!article) {
        redirect('/articles')
    }

    return {
        title: article.title,
        description: article.description
    }
}
