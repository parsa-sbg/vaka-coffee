import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import React from 'react'

type Props = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string };
};

const page = async ({ params }: { params: Promise<{ search: string }> }) => {

    const { search } = await params


    return (
        <div className='mt-16'>
            <ProductsHeader title={`نتیجه جستجوی : ${search}`} />

            <div className='container mt-8'>
                <Products intialProducts={[]} categories={[]} />
            </div>
        </div>
    )
}


export default page