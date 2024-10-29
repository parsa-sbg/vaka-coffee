import React from 'react'
import Price from './Price'
import Weight from './Weight'

function Filters() {
  return (
    <div className=' flex flex-col gap-5'>
      <Price />
      <Weight />
    </div>
  )
}

export default Filters