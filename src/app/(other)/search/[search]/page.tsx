import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import { categoryModel, connectToDataBase, productmodel } from '@/models'
import { Metadata } from 'next'
import React from 'react'


const page = async ({ params }: { params: Promise<{ search: string }> }) => {

    const search = decodeURIComponent((await params).search)


    await connectToDataBase()
    const allCategories = await categoryModel.find({})

    const intialProducts = await productmodel.find({ $text: { $search: search } })

    return (
        <div className='mt-16'>
            <ProductsHeader title={`نتیجه جستجوی : ${search}`} />

            <div className='container mt-8'>
                <Products intialProducts={JSON.parse(JSON.stringify(intialProducts))} search={search} categories={JSON.parse(JSON.stringify(allCategories))} />
            </div>
        </div>
    )
}


export default page

export async function generateMetadata(
    { params }: { params: Promise<{ search: string }> },
): Promise<Metadata> {

    const search = decodeURIComponent((await params).search)

    return {
        title: `جستجوی "${search}"`
    }
}
