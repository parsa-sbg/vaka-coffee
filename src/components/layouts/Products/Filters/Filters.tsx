import React from 'react'
import Price from './Price'
import Weight from './Weight'

type props = {
  setMinPrice: React.Dispatch<React.SetStateAction<number>>
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>
}

function Filters({ setMaxPrice, setMinPrice }: props) {



  return (
    <div className=' flex flex-col gap-5'>
      <Price setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
    </div>
  )
}

export default Filters