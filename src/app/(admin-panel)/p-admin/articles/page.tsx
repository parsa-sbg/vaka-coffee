import ArticlesTable from '@/components/modules/admin/articles/ArticlesTable'
import { connectToDataBase } from '@/models'
import { ArticleModel } from '@/models/Article'
import React from 'react'

async function page() {

    connectToDataBase()

    const articles = await ArticleModel.find().sort({ _id: -1 })

    return (
        <div>
            <ArticlesTable intialArticles={JSON.parse(JSON.stringify(articles))} />
        </div>
    )
}

export default page