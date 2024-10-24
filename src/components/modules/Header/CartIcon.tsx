import React from 'react'
import { PiShoppingCart } from "react-icons/pi";


function CartIcon() {
  return (
    <div className='cursor-pointer group p-1'>
        <PiShoppingCart className='group-hover:text-main transition-colors duration-200' size={25} />
    </div>
  )
}

export default CartIcon