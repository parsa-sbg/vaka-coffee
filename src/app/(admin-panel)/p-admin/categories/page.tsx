import CategoriesTable from '@/components/modules/admin/categories/CategoriesTable'
import { categoryModel } from '@/models'
import { connectToDataBase } from '@/utils/server/dataBase'
import { Metadata } from 'next'
import React from 'react'

async function Categories() {

  await connectToDataBase()
  const categories = await categoryModel.find({}).sort({ _id: -1 })


  return (
    <div className="pb-2">


      <CategoriesTable intialCategories={JSON.parse(JSON.stringify(categories))} />

    </div>
  )
}

export default Categories

export const metadata: Metadata = {
  title: "پنل مدیریت - دسته بندی ها",
};
