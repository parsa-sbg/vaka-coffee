import React from 'react'

type ProductsListHeaderProps = {
    title: string
}

function ProductsListHeader({ title }: ProductsListHeaderProps) {



    return (
        <div className='bg-secondary py-10'>
            <h1 className='text-center font-bold text-2xl'>{title}</h1>
        </div>
    )
}

export default ProductsListHeader