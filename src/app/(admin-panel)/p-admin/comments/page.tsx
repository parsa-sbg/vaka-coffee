import CommetnsTable from '@/components/modules/admin/comments/CommetnsTable'
import { CommentModel, connectToDataBase } from '@/models'
import { Metadata } from 'next'
import React from 'react'

async function Commetns() {

  connectToDataBase()
  const allComments = await CommentModel.find().populate({ path: 'user' }).populate('product').sort({ _id: -1 })


  return (
    <div className='custom-scrollbar pb-2'>
      <CommetnsTable intialComments={JSON.parse(JSON.stringify(allComments))} />
    </div>
  )
}

export default Commetns

export const metadata: Metadata = {
  title: "پنل مدیریت - کامنت ها",
};
