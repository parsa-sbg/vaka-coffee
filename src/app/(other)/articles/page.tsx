import ArticleBox from "@/components/common/ArticleBox";
import { connectToDataBase } from "@/models";
import { ArticleModel } from "@/models/Article";
import React from "react";

async function page() {

    connectToDataBase()
    const articles = await ArticleModel.find({})

    return (
        <div className='container mt-8'>

            <div className='flex justify-center flex-col items-center gap-3'>
                <h1 className='font-bold text-2xl text-center text-main '>باشگاه مشتریان واکا</h1>
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
