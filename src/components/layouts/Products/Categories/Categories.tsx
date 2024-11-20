import { CategoryInterface } from '@/models/Category'
import Link from 'next/link'
import React from 'react'

type props = {
  categories: CategoryInterface[]
}


function Categories({ categories }: props) {
  return (
    <div className=' rounded-md p-4 sm:border border-secondary'>

      <h2 className='bg-secondary rounded-sm font-semibold py-2 px-4'>
        دسته بندی ها
      </h2>

      <ul className='mt-5'>

        <li className=''>
          <Link href={`/products`} className='py-2 block transition-all duration-200 rounded-sm hover:bg-secondary hover:text-main'>همه محصولات</Link>
        </li>

        {categories.map(cat => (
          <li key={cat._id.toString()} className=''>
            <Link href={`/categories/${cat.shortName}`} className='py-2 block transition-all duration-200 rounded-sm hover:bg-secondary hover:text-main'>{cat.name}</Link>
          </li>
        ))}


      </ul>

    </div>
  )
}

export default Categories