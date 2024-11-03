import UsersTable from '@/components/modules/admin/users/UsersTable'
import React from 'react'

function Users() {
  return (
    <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2'>
      <UsersTable />
    </div>
  )
}

export default Users