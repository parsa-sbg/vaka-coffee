"use client"

import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import ProductItem from './ProductItem'
import { ProductInterface } from '@/models/Product'
import { CategoryInterface } from '@/models/Category'
import { useModal } from '@/hooks/useModal'
import Modal from '@/components/common/Modal'
import UpdateProductModal from './UpdateProductModal/UpdateProductModal'


type props = {
    intialProducts: ProductInterface[]
    categories: CategoryInterface[]
}

function ProductsTable({ intialProducts, categories }: props) {


    const [products, setProducts] = useState(intialProducts)
    const [shownProducts, setShownProducts] = useState(intialProducts)

    const { hideModal: hideUpdateModal, isModalShow: isUpdateModalShow, showModal: showUpdateModal } = useModal()
    const [clickedProduct, setClickedProduct] = useState<ProductInterface>()


    const editBtnClickHandler = (product: ProductInterface) => {
        setClickedProduct(product)
        showUpdateModal()
    }

    return (
        <>
            <Header setShownProducts={setShownProducts} products={products} categories={categories} setProducts={setProducts} />
            <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

                <thead className="text-xs text-nowrap bg-secondary">
                    <tr>
                        <th scope="col" className="px-1 py-3">
                            <span>شماره</span>
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عکس
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            نام
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            دسته بندی
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            قیمت
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {shownProducts.map((product, index) => (
                        <ProductItem number={index + 1} editBtnClickHandler={editBtnClickHandler} setProducts={setProducts} product={product} key={product._id?.toString()} isOdd={index % 2 == 0} />
                    ))}

                </tbody>
            </table>
            <Modal isModalShow={isUpdateModalShow} coverClickhandler={hideUpdateModal}>
                {clickedProduct && <UpdateProductModal product={clickedProduct} categories={categories} hideModal={hideUpdateModal} setProducts={setProducts} />}
            </Modal>
        </>

    )
}

export default ProductsTable