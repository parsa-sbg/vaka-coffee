import React from 'react'
import ArticlesItem from './ArticlesItem'
import Header from './Header'
import { ArticleInterface } from '@/models/Article'


type props = {
    articles: ArticleInterface[]
}

function ArticlesTable({ articles }: props) {
    return (
        <>
            <Header />
            <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

                <thead className="text-xs text-nowrap bg-secondary">
                    <tr>
                        <th scope="col" className="px-1 py-3">
                            <span>شماره</span>
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عکس
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            تاریخ
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عنوان
                        </th>

                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {articles.map((article, index) => (
                        <ArticlesItem article={article} key={article._id.toString()} isOdd={index % 2 == 0} number={index + 1} />
                    ))}


                </tbody>
            </table>
        </>
    )
}

export default ArticlesTable