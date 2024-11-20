import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import { categoryModel, connectToDataBase } from '@/models'
import React from 'react'

export default async function page() {


  connectToDataBase()
  const categories = await categoryModel.find()

  return (
    <div className='mt-16'>
      <ProductsHeader title='همه محصولات' />

      <div className='container mt-8'>
        <Products categories={categories} />
      </div>
    </div>
  )
}

