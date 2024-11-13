"use client"
import { CategoryInterface } from '@/models/Category'
import React, { useState } from 'react'
import CategoryItem from './CategoryItem'
import Header from './Header'

type props = {
    intialCategories: CategoryInterface[]
}

function CategoriesTable({ intialCategories }: props) {

    const [categories, setCategories] = useState(intialCategories)

    return (
        <>
            <Header setCategories={setCategories} />
            <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

                <thead className="text-xs text-nowrap bg-secondary">
                    <tr>
                        <th scope="col" className="px-1 py-3">
                            <span>شماره</span>
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            نام
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            نام کوتاه
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {categories.map((category, index) => (
                        <CategoryItem key={category._id.toString()} category={category} isOdd={index % 2 == 0} number={index + 1} />
                    ))}

                </tbody>
            </table>
        </>
    )
}

export default CategoriesTable