import React from 'react'
import AdminMenuItem from './AdminMenuItem'

function AdminMenu() {


    return (
        <div className='border-b sm:border-none sm:pb-0 pb-2 border-secondary'>
            <h3 className='font-semibold text-lg bg-secondary py-2 px-4 mb-2 rounded-md border-b border-b-secondary'>پنل مدیریت</h3>

            <ul className='flex flex-col gap-2'>

                <AdminMenuItem text='پیشخوان' href='/p-admin' />
                <AdminMenuItem text='محصولات' href='/p-admin/products' />
                <AdminMenuItem text='دسته بندی ها' href='/p-admin/categories' />
                <AdminMenuItem text='سفارش‌ ها' href='/p-admin/orders' />
                <AdminMenuItem text='کامنت ها' href='/p-admin/comments' />
                <AdminMenuItem text='کاربران' href='/p-admin/users' />
                <AdminMenuItem text='جزئیات حساب' href='/p-admin/account' />

                <li>
                    <button className='text-right py-2 px-4 rounded-md transition-all duration-200 hover:bg-[#0f0f0f] hover:text-main w-full'>خروج</button>
                </li>

            </ul>

        </div>
    )
}

export default AdminMenu