"use client"
import React from 'react'
import Header from './Header/Header'
import ProductBox from '@/components/common/ProductBox'
import { ProductInterface } from '@/models/Product'
import ProductBoxSkeleton from '@/components/common/ProductBoxSkeleton'
import { selectedSortType } from './Header/Sort'

type ProductsListProps = {
  setIsMenuOpen: (isOpen: boolean) => void
  products: ProductInterface[]
  isLoading: boolean
  setSelectedSort: React.Dispatch<React.SetStateAction<selectedSortType>>
}

function ProductsList({ setIsMenuOpen, products, isLoading, setSelectedSort }: ProductsListProps) {
  return (
    <div className=''>
      <Header setSelectedSort={setSelectedSort} setIsMenuOpen={setIsMenuOpen} />

      <div className='container mt-5 grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {products.length
          ? products.map(product => (
            !isLoading
              ? <ProductBox key={product._id.toString()} product={product} />
              : <ProductBoxSkeleton key={product._id.toString() + 'loading'} />
          ))
          : !isLoading
            ? 'محصولی پیدا نشد !'
            : Array(5).fill(0).map(item => (
              <ProductBoxSkeleton key={crypto.randomUUID() + 'loading'} />
            ))
         
        }
      </div>
    </div>
  )
}

export default ProductsList