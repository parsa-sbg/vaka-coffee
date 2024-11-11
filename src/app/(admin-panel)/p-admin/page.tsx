import Box from '@/components/modules/admin/index/Box'
import React from 'react'
import { RiListCheck3 } from 'react-icons/ri'
import { LiaCommentsSolid } from "react-icons/lia";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import { TfiPackage } from "react-icons/tfi";
import { PiShapesThin } from "react-icons/pi";



function AdminPanel() {
    return (
        <div className=''>

            <p>سلام <span className='font-semibold'>ثنا</span></p>
            <p className='mt-3'>از طریق پیشخوان پنل مدیریت، می‌توانید تمام سفارش‌ ها را مشاهده، و کاربران و محصولات را مدیریت کنید.</p>

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

export default AdminPanel