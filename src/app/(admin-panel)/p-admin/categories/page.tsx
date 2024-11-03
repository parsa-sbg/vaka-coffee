import CategoriesTable from '@/components/modules/admin/categories/CategoriesTable'
import Header from '@/components/modules/admin/categories/Header'
import React from 'react'

function Categories() {
  return (
    <div className="custom-scrollbar overflow-auto overflow-x-scroll pb-2">
      
      <Header />
      <CategoriesTable />

    </div>
  )
}

export default Categories