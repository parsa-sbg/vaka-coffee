import ArticleBox from "@/components/common/ArticleBox";
import { connectToDataBase } from "@/models";
import { ArticleModel } from "@/models/Article";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

async function page() {

    connectToDataBase()
    const articles = await ArticleModel.find({})

    return (
        <div className='container mt-8'>

            <div className='flex justify-center flex-col items-center gap-3'>
                <h1 className='font-bold text-2xl text-center text-main '>باشگاه مشتریان واکا</h1>
                <div className="flex gap-1">
                    <Link className='opacity-80 transition-opacity duration-200 hover:opacity-100' href='/' >خانه </Link> / <span className=''>باشگاه مشتریان </span>
                </div>
            </div>

            <div className='mt-14 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5'>
                {articles.map(article => (
                    <div key={article._id.toString()}>
                        <ArticleBox article={article} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page;

export const metadata: Metadata = {
    title: 'آکادمی قهوه واکا ، مطالب داغ و کاربردی دنیای قهوه | قهوه واکا',
    description: 'در آکادمی قهوه واکا مطالب مفیدی از دنیای قهوه ارایه می‌شود که براساس پربازدیدترین مطالب روز قهوه و مباحث داغ کاربردی انتخاب می‌شوند.'
}