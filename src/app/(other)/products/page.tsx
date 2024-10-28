import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import React from 'react'

function page() {
  return (
    <div className='mt-16'>
      <ProductsHeader title='همه محصولات' />

      <div className='container mt-8'>
        <Products />
      </div>
    </div>
  )
}

export default page