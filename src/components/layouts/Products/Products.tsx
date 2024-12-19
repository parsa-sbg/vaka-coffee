"use client"

import React, { useEffect, useState } from 'react'
import ProductsList from './ProductsList/ProductsList'
import Categories from './Categories/Categories'
import Filters from './Filters/Filters'
import { IoClose } from "react-icons/io5";
import { CategoryInterface } from '@/models/Category'
import { ProductInterface } from '@/models/Product'
import { selectedSortType } from './ProductsList/Header/Sort'
import Cover from '@/components/common/Cover'



type props = {
    categories: CategoryInterface[]
    intialProducts: ProductInterface[]
    categoryShortName?: string
    search?: string
}

function Products({ categories = [], intialProducts, categoryShortName, search = '' }: props) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isFirdtRender, setIsFirdtRender] = useState(true)

    const [products, setProducts] = useState(intialProducts)
    const [isLoading, setIsLoading] = useState(false)

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(2_000_000)
    const [selectedSort, setSelectedSort] = useState<selectedSortType>('latest')


    const [getProductsUrl, setGetProductsUrl] = useState(`/api/products?categoryShortName=${categoryShortName}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${selectedSort}&search=${search}`)


    useEffect(() => {
        setGetProductsUrl(`/api/products?categoryShortName=${categoryShortName}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${selectedSort}&search=${search}`)
    }, [minPrice, maxPrice, selectedSort])


    useEffect(() => {
        console.log(getProductsUrl);

        if (!isFirdtRender) {
            setIsLoading(true)
            fetch(getProductsUrl)
                .then(res => {
                    if (res.status == 200) {
                        return res.json()
                    } else {
                        return null
                    }
                })
                .then(data => {
                    if (data) {
                        setProducts(data)
                    }
                    setIsLoading(false)
                })
        } else {
            setIsFirdtRender(false)
        }

    }, [getProductsUrl])



    return (
        <div className='grid grid-cols-9 md:grid-cols-12 gap-5'>

            <div className={`${isMenuOpen && '!right-0'} overflow-y-scroll sm:overflow-y-visible no-scrollbar transition-all duration-300 fixed z-50 sm:z-10 w-full max-w-52 sm:max-w-full bg-bgColer sm:static md:col-span-3 top-0 bottom-0 -right-52 col-span-3 flex flex-col gap-5`}>


                <div>
                    <div className='p-4 border-b border-secondary sm:hidden flex items-center justify-between'>
                        <span>فیلتر ها</span>
                        <IoClose onClick={() => { setIsMenuOpen(false) }} className='cursor-pointer' size={25} />
                    </div>
                    <Categories categories={categories} />
                </div>

                <Filters setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
            </div>

            <div className='col-span-9 sm:col-span-6 md:col-span-9'>
                <ProductsList setSelectedSort={setSelectedSort} isLoading={isLoading} products={products} setIsMenuOpen={setIsMenuOpen} />
            </div>

            <Cover visible={isMenuOpen} onClick={() => {setIsMenuOpen(false)}} />

        </div>
    )
}

export default Products