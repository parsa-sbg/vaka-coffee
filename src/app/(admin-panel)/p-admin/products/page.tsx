import ProductsTable from '@/components/modules/admin/products/ProductsTable'
import { productmodel } from '@/models/Product'
import React from 'react'

async function Products() {

  const allProducts = await productmodel.find({}).sort({ id: -1 }).populate('category')

  return (

    <div className="pb-2">

      <ProductsTable intialProducts={JSON.parse(JSON.stringify(allProducts))} />

    </div>

  )
}

export default Products