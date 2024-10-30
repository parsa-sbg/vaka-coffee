import ProductsHeader from '@/components/common/ProductsListHeader'
import Products from '@/components/layouts/Products/Products'
import React from 'react'


const page = async () => {


    return (
        <div className='mt-16'>
            <ProductsHeader title='نام کتگوری' />

            <div className='container mt-8'>
                <Products />
            </div>
        </div>
    )
}


export default page