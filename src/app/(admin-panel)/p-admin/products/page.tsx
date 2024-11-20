import ProductsTable from '@/components/modules/admin/products/ProductsTable'
import { categoryModel } from '@/models'
import { productmodel } from '@/models'
import { connectToDataBase } from '@/utils/server/dataBase'
import React from 'react'

async function Products() {

  await connectToDataBase()
  const allProducts = await productmodel.find({}).sort({ _id: -1 }).populate('category')
  const categories = await categoryModel.find({})

  return (

    <div className="pb-2">

      <ProductsTable categories={JSON.parse(JSON.stringify(categories))} intialProducts={JSON.parse(JSON.stringify(allProducts))} />

    </div>

  )
}

export default Products