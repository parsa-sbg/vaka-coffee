"use client"
import { UserInterface } from '@/models/User'
import React, { useState } from 'react'
import AdminItem from './AdminItem'

type props = {
    intialAdmins: UserInterface[]
}

function AdminsTable({ intialAdmins }: props) {

    const [admins, setAdmins] = useState(intialAdmins)

    return (
        <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

            <thead className="text-xs text-nowrap bg-secondary">
                <tr>
                    <th scope="col" className="px-1 py-3">
                        <span>شماره</span>
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        نام
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        نام کاربری
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        شماره تماس
                    </th>
                    <th scope="col" className="px-3 lg:px-6 py-3">
                        عملیات
                    </th>
                </tr>
            </thead>

            <tbody>

                {admins.map((admin, index) => (
                    <AdminItem setAdmins={setAdmins} key={admin.username} admin={admin} number={index + 1} isOdd={index % 2 !== 0} />
                ))}

            </tbody>
        </table>
    )
}

export default AdminsTable