import React from 'react'
import CommentsList from './CommentsList'
import AddCommetnForm from './AddCommetnForm'
import mongoose from 'mongoose'
import { CommentInterface } from '@/models/Comment'

type props = {
  productId: mongoose.Types.ObjectId
  userPendingComments: CommentInterface[]
  setUserPendingComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>
  acceptedComments: CommentInterface[]
}

function Commetns({ productId, userPendingComments, setUserPendingComments, acceptedComments }: props) {
  return (
    <div className='flex flex-col sm:flex-row gap-8'>

      <div className='basis-1/2 order-1 '>
        <CommentsList acceptedComments={acceptedComments} userPendingComments={userPendingComments} />
      </div>

      <div className='basis-1/2 sm:order-2'>
        <AddCommetnForm setUserPendingComments={setUserPendingComments} productId={productId} />
      </div>
    </div>
  )
}

export default Commetns