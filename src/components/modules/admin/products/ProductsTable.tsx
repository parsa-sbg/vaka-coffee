import toPersionNumber from '@/utils/toPersianNubmer'
import Image from 'next/image'
import React from 'react'
import Header from './Header/Header'
import ProductItem from './ProductItem'

function ProductsTable() {
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

                    <ProductItem isOdd={false} />
                    <ProductItem isOdd={true} />
                    <ProductItem isOdd={false} />
                    <ProductItem isOdd={true} />


                </tbody>
            </table>
        </>

    )
}

export default ProductsTable