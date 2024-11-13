import CategoriesTable from '@/components/modules/admin/categories/CategoriesTable'
import Header from '@/components/modules/admin/categories/Header'
import categoryModel from '@/models/Category'
import { connectToDataBase } from '@/utils/server/dataBase'
import React from 'react'

async function Categories() {

  connectToDataBase()
  const categories = await categoryModel.find({}).sort({ _id: -1 })


  return (
    <div className="custom-scrollbar overflow-auto overflow-x-scroll pb-2">

     
      <CategoriesTable intialCategories={JSON.parse(JSON.stringify(categories))} />

    </div>
  )
}

export default Categories