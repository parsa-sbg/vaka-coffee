import AdminsTable from '@/components/modules/admin/admins/AdminsTable'
import UserModel from '@/models/User'
import { connectToDataBase } from '@/utils/server/dataBase'
import React from 'react'

async function page() {
    connectToDataBase()
    const admins = await UserModel.find({ role: 'ADMIN' })

    return (

        <div className='custom-scrollbar overflow-auto overflow-x-scroll pb-2' >
            <AdminsTable intialAdmins={JSON.parse(JSON.stringify(admins))} />
        </div >

    )

}

export default page