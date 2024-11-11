import UserModel from '@/models/User'
import { connectToDataBase } from '@/utils/server/dataBase'
import toPersionNumber from '@/utils/toPersianNubmer'
import React from 'react'
import UserItem from './UserItem'

async function UsersTable() {


    connectToDataBase()

    const users = await UserModel.find()
    console.log('users => ', users);


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

                {users.map((user, index) => (
                    <UserItem user={user} number={index + 1} isOdd={index / 2 !== 0} />
                ))}

            </tbody>
        </table>
    )
}

export default UsersTable