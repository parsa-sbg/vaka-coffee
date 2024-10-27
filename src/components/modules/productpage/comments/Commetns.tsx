import React from 'react'
import CommentsList from './CommentsList'
import AddCommetnForm from './AddCommetnForm'

function Commetns() {
  return (
    <div className='flex flex-col sm:flex-row gap-8'>

      <div className='basis-1/2 order-1 '>
        <CommentsList />
      </div>

      <div className='basis-1/2 sm:order-2'>
        <AddCommetnForm />
      </div>
    </div>
  )
}

export default Commetns