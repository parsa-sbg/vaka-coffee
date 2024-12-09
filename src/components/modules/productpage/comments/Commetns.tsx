import React from 'react'
import CommentsList from './CommentsList'
import AddCommetnForm from './AddCommetnForm'
import mongoose from 'mongoose'

type props = {
  productId: mongoose.Types.ObjectId
}

function Commetns({ productId }: props) {
  return (
    <div className='flex flex-col sm:flex-row gap-8'>

      <div className='basis-1/2 order-1 '>
        <CommentsList />
      </div>

      <div className='basis-1/2 sm:order-2'>
        <AddCommetnForm productId={productId} />
      </div>
    </div>
  )
}

export default Commetns