import Link from 'next/link'
import React from 'react'

function Categories() {
  return (
    <div className=' rounded-md p-4 sm:border border-secondary'>

      <h2 className='bg-secondary rounded-sm font-semibold py-2 px-4'>
        دسته بندی ها
      </h2>

      <ul className='mt-5'>

        <li className=''>
          <Link className='py-2 block transition-all duration-200 rounded-sm hover:bg-secondary hover:text-main' href='/category/cat-short-name'>قهوه عربیکا</Link>
        </li>

        <li className=''>
          <Link className='py-2 block transition-all duration-200 rounded-sm hover:bg-secondary hover:text-main' href='/category/cat-short-name'>قهوه روبوستا</Link>
        </li>

        <li className=''>
          <Link className='py-2 block transition-all duration-200 rounded-sm hover:bg-secondary hover:text-main' href='/category/cat-short-name'>قهوه ترک</Link>
        </li>

        <li className=''>
          <Link className='py-2 block transition-all duration-200 rounded-sm hover:bg-secondary hover:text-main' href='/category/cat-short-name'>قهوه سبک زندگی</Link>
        </li>

      </ul>

    </div>
  )
}

export default Categories