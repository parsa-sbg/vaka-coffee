import AdminsTable from '@/components/modules/admin/admins/AdminsTable'
import UserModel from '@/models/User'
import { authUserWithToken } from '@/utils/server/auth'
import { connectToDataBase } from '@/utils/server/dataBase'
import { cookies } from 'next/headers'
import React from 'react'

async function page() {
    connectToDataBase()
    const admins = await UserModel.find({ role: 'ADMIN' })

    const token = (await cookies()).get('token')?.value
    const manager = await authUserWithToken(token)
    if (!manager) return

    return (

        <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2' >
            <AdminsTable managerRole={manager.role} intialAdmins={JSON.parse(JSON.stringify(admins))} />
        </div >

    )

}

export default page