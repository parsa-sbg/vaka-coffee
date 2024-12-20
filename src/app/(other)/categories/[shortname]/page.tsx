import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import { categoryModel, connectToDataBase, productmodel } from '@/models'
import { redirect } from 'next/navigation'
import React from 'react'

type props = {
    params: Promise<{ shortname: string }>
}

export default async function page({ params }: props) {

    const catShortname = (await params).shortname


    await connectToDataBase()
    const category = await categoryModel.findOne({ shortName: catShortname }).sort({ createdAt: -1 })
    if (!category) {
        redirect('/products')
    }
    const allCategories = await categoryModel.find({})


    const products = await productmodel.find({ category: category._id })

    return (
        <div className='mt-16'>
            <ProductsHeader title={`محصولات دسته ${category.name}`} />

            <div className='container mt-8'>
                <Products categoryShortName={catShortname} categories={JSON.parse(JSON.stringify(allCategories))} intialProducts={JSON.parse(JSON.stringify(products))} />
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