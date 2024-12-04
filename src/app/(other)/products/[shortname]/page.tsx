import AddToCart from '@/components/modules/productpage/AddToCart'
import Breadcrumb from '@/components/modules/productpage/Breadcrumb'
import Content from '@/components/modules/productpage/Content'
import Details from '@/components/modules/productpage/Details'
import ImagesSlider from '@/components/modules/productpage/ImagesSlider'
import MoreProducts from '@/components/modules/productpage/MoreProducts'
import RelatedProducts from '@/components/modules/productpage/RelatedProducts'
import { connectToDataBase, productmodel } from '@/models'
import { notFound } from 'next/navigation'
import React from 'react'

type props = {
    params: Promise<{ shortname: string }>
}

export default async function Product({ params }: props) {

    const shortName = (await params).shortname

    await connectToDataBase()

    const product = await productmodel.findOne({ shortName }).populate('category')
    if (!product) notFound()


    return (
        <div className=' mt-16 '>

            <div className='container grid grid-cols-1 sm:grid-cols-12 gap-7 sm:gap-3 md:gap-7'>
                <div className='h-full min-h-56 sm:col-span-5 md:col-span-4 lg:col-span-3'>
                    <ImagesSlider picturesUrl={product.pictures} />
                </div>

                <div className='sm:col-span-7 md:col-span-8'>
                    <Breadcrumb categoryName={product.category.name} categoryShortName={product.category.shortName} productName={product.name} />
                    <Details title={product.name} commentsCount={3} score={3} price={product.price} dynamicFields={product.dynamicFields} discount={product.discount} />
                    <AddToCart stock={JSON.parse(JSON.stringify(product.stock))} productId={JSON.parse(JSON.stringify(product._id))} productName={JSON.parse(JSON.stringify(product.name))} />
                </div>
            </div>

            <div className='mt-16'>
                <Content />
            </div>

            <div className='container'>
                <MoreProducts />
                <RelatedProducts />
            </div>

        </div>
    )
}


export const revalidate = 60

export const generateMetadata = async ({ params }: props) => {
    const shortName = (await params).shortname

    await connectToDataBase()

    const product = await productmodel.findOne({ shortName }).populate('category')
    if (!product) notFound()

    return {
        title: product.name,
        description: `فروش ${product.name}`
    }
}