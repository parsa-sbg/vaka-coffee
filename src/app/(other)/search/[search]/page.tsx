import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import { categoryModel, connectToDataBase, productmodel } from '@/models'
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
                <Products intialProducts={JSON.parse(JSON.stringify(intialProducts))} categories={JSON.parse(JSON.stringify(allCategories))} />
            </div>
        </div>
    )
}


export default page