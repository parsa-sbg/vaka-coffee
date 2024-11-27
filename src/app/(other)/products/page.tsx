import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import { categoryModel, connectToDataBase, productmodel } from '@/models'
import React from 'react'

export default async function page() {


  await connectToDataBase()
  const categories = await categoryModel.find()
  const allProducts = await productmodel.find().sort({createdAt : -1})

  return (
    <div className='mt-16'>
      <ProductsHeader title='همه محصولات' />

      <div className='container mt-8'>
        <Products intialProducts={JSON.parse(JSON.stringify(allProducts))} categories={JSON.parse(JSON.stringify(categories))} />
      </div>
    </div>
  )
}

