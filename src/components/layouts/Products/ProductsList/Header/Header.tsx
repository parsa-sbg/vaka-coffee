import React from 'react'
import BreadCrumb from './BreadCrumb'
import Sort from './Sort'

function Header() {
  return (
    <div className='flex items-center justify-between'>
      <BreadCrumb />
      <Sort />
    </div>
  )
}

export default Header