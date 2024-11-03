import CommetnsTable from '@/components/modules/admin/comments/CommetnsTable'
import React from 'react'

function Commetns() {
  return (
    <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2'>
      <CommetnsTable />
    </div>
  )
}

export default Commetns