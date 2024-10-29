import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import { NextPage } from 'next';
import React from 'react'

type Props = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string };
};

const page = async ({ params, searchParams }: Props) => {


    return (
        <div className='mt-16'>
            <ProductsHeader title='نام کتگوری' />

            <div className='container mt-8'>
                <Products />
            </div>
        </div>
    )
}


export default page