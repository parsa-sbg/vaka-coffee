import React from 'react'
import Header from './Header/Header'
import ProductBox from '@/components/common/ProductBox'

function ProductsList() {
  return (
    <div className=''>
      <Header />

      <div className='container mt-8 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
        <ProductBox />
      </div>
    </div>
  )
}

export default ProductsList