import React from 'react'
import Header from './Header/Header'
import ProductBox from '@/components/common/ProductBox'

type ProductsListProps = {
  setIsMenuOpen: (isOpen : boolean) => void
}

function ProductsList({ setIsMenuOpen }: ProductsListProps) {
  return (
    <div className=''>
      <Header setIsMenuOpen={setIsMenuOpen} />

      <div className='container mt-5 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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