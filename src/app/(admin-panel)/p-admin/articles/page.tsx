import ArticlesTable from '@/components/modules/admin/articles/ArticlesTable'
import { connectToDataBase } from '@/models'
import { ArticleModel } from '@/models/Article'
import React from 'react'

async function page() {

    connectToDataBase()

    const articles = await ArticleModel.find().sort({ _id: -1 })

    return (
        <div>
            <ArticlesTable articles={articles} />
        </div>
    )
}

export default page