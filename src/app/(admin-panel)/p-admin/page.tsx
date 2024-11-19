import Box from '@/components/modules/admin/index/Box'
import React from 'react'
import { RiListCheck3 } from 'react-icons/ri'
import { LiaCommentsSolid } from "react-icons/lia";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { TfiPackage } from "react-icons/tfi";
import { PiShapesThin } from "react-icons/pi";
import Title from '@/components/modules/admin/index/Title';
import { authUserWithToken } from '@/utils/server/auth';
import { cookies } from 'next/headers';
import { Metadata } from 'next';


export default async function AdminPanel() {
    const token = (await cookies()).get('token')?.value
    const user = await authUserWithToken(token)
    if (!user) return


    return (
        <div className=''>

            <Title role={user.role} name={user?.name} />

            <div className='mt-7 grid xs:grid-cols-2 lg:grid-cols-3 gap-3'>
                <Box href='/p-admin/products' title='محصولات' Icon={TfiPackage} />
                <Box href='/p-admin/categories' title='دسته بندی ها' Icon={PiShapesThin} />
                <Box href='/p-admin/orders' title='سفارش ها' Icon={RiListCheck3} />
                <Box href='/p-admin/comments' title='کامنت ها' Icon={LiaCommentsSolid} />
                <Box href='/p-admin/users' title='کاربران' Icon={PiUsersThreeLight} />
                <Box href='/p-admin/admins' title='ادمین ها' Icon={RiAdminLine} />

            </div>

        </div>
    )
}


export const metadata: Metadata = {
    title: "پنل مدیریت",
  };
  