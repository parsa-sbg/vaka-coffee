import CommetnsTable from '@/components/modules/admin/comments/CommetnsTable'
import { CommentModel, connectToDataBase } from '@/models'
import React from 'react'

async function Commetns() {

  connectToDataBase()
  const allComments = await CommentModel.find().populate({ path: 'user' }).populate('product').sort({ _id: -1 })


  return (
    <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2'>
      <CommetnsTable allComments={JSON.parse(JSON.stringify(allComments))} />
    </div>
  )
}

export default Commetns