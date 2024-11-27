import React from 'react'
import BreadCrumb from './BreadCrumb'
import Sort, { selectedSortType } from './Sort'
import { FaFilter } from "react-icons/fa6";

type headerProps = {
  setIsMenuOpen: (isOpen : boolean) => void
  setSelectedSort: React.Dispatch<React.SetStateAction<selectedSortType>>
}

function Header({ setIsMenuOpen, setSelectedSort }: headerProps) {
  return (
    <div className=''>

      <div className='border-b border-b-secondary sm:border-none pb-3 mb-3 sm:pb-0 sm:mb-0 flex items-center justify-between'>
        <BreadCrumb />
        <Sort setSelectedSort={setSelectedSort} />
      </div>

      <div onClick={() => { setIsMenuOpen(true) }} className='mt-2 text-sm text-nowrap sm:hidden flex items-center gap-2 cursor-pointer'>
        <FaFilter />
        مشاهده فیلترها
      </div>

    </div>
  )
}

export default Header