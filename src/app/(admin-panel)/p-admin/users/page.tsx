import UsersTable from '@/components/modules/admin/users/UsersTable'
import UserModel from '@/models/User';
import { authUserWithToken } from '@/utils/server/auth';
import { connectToDataBase } from '@/utils/server/dataBase';
import { cookies } from 'next/headers';
import React from 'react'

async function Users() {

  const token = (await cookies()).get('token')?.value
  const manager = await authUserWithToken(token)
  if (!manager) return


  await connectToDataBase()

  const users = await UserModel.find({ role: 'USER' }).sort({ _id: -1 })

  return (
    <div className='custom-scrollbar overflow-x-scroll pb-2'>
      <UsersTable managerRole={manager.role} intialUsers={JSON.parse(JSON.stringify(users))} />
    </div>
  )
}

export default Users