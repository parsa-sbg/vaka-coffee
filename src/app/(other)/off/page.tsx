import ProductBox from '@/components/common/ProductBox'
import { productmodel } from '@/models'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'

async function page() {

  const discountedProducts = await productmodel.find({ discount: { $gt: 0 } })


  return (
    <div className='container mt-8'>

      <div className='flex justify-center flex-col items-center gap-3'>
        <Image draggable={false} quality={20} className='w-20 h-20' alt='' src={'/animate-fire.png'} width={200} height={200}></Image>
        <h1 className='font-bold text-2xl text-center text-main '>تخفیف‌های قهوه واکا</h1>
      </div>

      <div className='mt-14 grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5'>
        {discountedProducts.map(product => (
          <div key={product._id.toString()}>
            <ProductBox product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page

export const metadata: Metadata = {
  title: 'تخفیف ها | قهوه واکا',
  description: 'تخفیف ویژه بلک فرایدی 1402 در قهوه واکا | به طور روزانه این صفحه را بررسی کنید تا از جدیدترین تخفیف های محصولات ما باخبر شوید.'
}