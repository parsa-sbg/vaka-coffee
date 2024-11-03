import OrdersTable from '@/components/modules/admin/orderes/OrdersTable'
import React from 'react'

function Orders() {
  return (
    <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2'>
      <OrdersTable />
    </div>
  )
}

export default Orders