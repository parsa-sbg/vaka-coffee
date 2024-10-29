import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import React from 'react'

type Props = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string };
};

const page = async ({ params: asyncParams, searchParams: asyncSearchParams }: Props) => {

    const params = await asyncParams



    return (
        <div className='mt-16'>
            <ProductsHeader title={`نتیجه جستجوی : ${params.search}`} />

            <div className='container mt-8'>
                <Products />
            </div>
        </div>
    )
}


export default page