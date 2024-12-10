import React from 'react'
import ArticlesItem from './ArticlesItem'
import Header from './Header'

function ArticlesTable() {
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
                            نام
                        </th>

                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody>

                    <ArticlesItem isOdd number={1} />
                    <ArticlesItem isOdd={false} number={2} />
                    <ArticlesItem isOdd number={3} />


                </tbody>
            </table>
        </>
    )
}

export default ArticlesTable