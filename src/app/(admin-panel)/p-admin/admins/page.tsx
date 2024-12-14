import AdminsTable from '@/components/modules/admin/admins/AdminsTable'
import UserModel from '@/models/User'
import { authUserWithToken } from '@/utils/server/auth'
import { connectToDataBase } from '@/utils/server/dataBase'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import React from 'react'

async function page() {

    const token = (await cookies()).get('token')?.value
    const manager = await authUserWithToken(token)
    if (!manager) return

    await connectToDataBase()
    const admins = await UserModel.find({ role: 'ADMIN' }).sort({ _id: -1 })

    return (

        <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2' >
            <AdminsTable managerRole={manager.role} intialAdmins={JSON.parse(JSON.stringify(admins))} />
        </div >

    )

}

export default page

export const metadata: Metadata = {
    title: "پنل مدیریت - ادمین ها",
};
