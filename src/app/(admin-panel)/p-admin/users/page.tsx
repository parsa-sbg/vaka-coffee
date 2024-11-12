import UsersTable from '@/components/modules/admin/users/UsersTable'
import UserModel from '@/models/User';
import { connectToDataBase } from '@/utils/server/dataBase';
import React from 'react'

async function Users() {

  connectToDataBase()

  const users = await UserModel.find({ role: 'USER' })


  return (
    <div className='custom-scrollbar overflow-x-scroll pb-2'>
      <UsersTable intialUsers={JSON.parse(JSON.stringify(users))} />
    </div>
  )
}

export default Users