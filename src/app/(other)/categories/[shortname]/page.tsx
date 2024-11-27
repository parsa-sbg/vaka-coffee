import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import { categoryModel, connectToDataBase } from '@/models'
import { notFound } from 'next/navigation'
import React from 'react'

type props = {
    params: Promise<{ shortname: string }>
}

export default async function page({ params }: props) {

    const catShortname = (await params).shortname


    await connectToDataBase()
    const categoryWithProducts = await categoryModel.findOne({ shortName: catShortname }).populate('products').sort({createdAt : -1})
    const allCategories = await categoryModel.find({})

    if (!categoryWithProducts) {
        return notFound()
    }

    return (
        <div className='mt-16'>
            <ProductsHeader title={`محصولات دسته ${categoryWithProducts.name}`} />

            <div className='container mt-8'>
                <Products categoryShortName={catShortname} categories={JSON.parse(JSON.stringify(allCategories))} intialProducts={JSON.parse(JSON.stringify(categoryWithProducts.products)) || []} />
            </div>
        </div>
    )
}

export const revalidate = 60

export const generateMetadata = async ({ params }: props) => {

    const catShortname = (await params).shortname


    await connectToDataBase()
    const category = await categoryModel.findOne({ shortName: catShortname })

    return {
        title: `محصولات دسته ${category?.name}`,
        description: `محصولات دسته ${category?.name}`
    }
}