import EditPage from "@/components/modules/admin/articles/EditPage/EditPage";
import { ArticleModel } from "@/models/Article";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

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
            <EditPage intialArticle={JSON.parse(JSON.stringify(article))} />
        </div>
    )
}

export default page;


export const metadata: Metadata = {
    title: "مدیریت - ویرایش مقاله",
};
