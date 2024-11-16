"use client"

import React, { useState } from 'react'
import Header from './Header/Header'
import ProductItem from './ProductItem'
import { ProductInterface } from '@/models/Product'


type props = {
    intialProducts: ProductInterface[]
}

function ProductsTable({ intialProducts }: props) {


    const [products, setProducts] = useState(intialProducts)

    return (
        <>
            <Header setProducts={setProducts} />
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
                            دسته بندی
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            قیمت
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {products.map((product, index) => (
                        <ProductItem key={product._id?.toString()} isOdd={index % 2 == 0} />
                    ))}

                </tbody>
            </table>
        </>

    )
}

export default ProductsTable