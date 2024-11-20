"use client"
import React from 'react'
import Header from './Header/Header'
import ProductBox from '@/components/common/ProductBox'
import { ProductInterface } from '@/models/Product'

type ProductsListProps = {
  setIsMenuOpen: (isOpen: boolean) => void
  products: ProductInterface[]
}

function ProductsList({ setIsMenuOpen, products }: ProductsListProps) {
  return (
    <div className=''>
      <Header setIsMenuOpen={setIsMenuOpen} />

      <div className='container mt-5 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.map(product => (
          <ProductBox key={product._id.toString()} discount={product.discount} imageUrl={product.pictures[0]} name={product.name} price={product.price} />
        ))}
      </div>
    </div>
  )
}

export default ProductsList