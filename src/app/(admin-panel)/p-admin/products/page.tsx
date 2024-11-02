import Header from '@/components/modules/admin/products/Header'
import ProductsTable from '@/components/modules/admin/products/ProductsTable'
import React from 'react'

function Products() {
  return (

    <div className="custom-scrollbar overflow-auto overflow-x-scroll pb-2">
      <Header />
      <ProductsTable />

    </div>

  )
}

export default Products