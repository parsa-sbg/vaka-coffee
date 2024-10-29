import Box from '@/components/modules/dashboard/index/Box'
import React from 'react'
import { RiListCheck3 } from "react-icons/ri";


function page() {
  return (
    <div className=''>

      <p>سلام <span className='font-semibold'>ثنا</span></p>
      <p className='mt-3'>از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب کاربری و کلمه عبور خود را ویرایش کنید.</p>

      <div className='mt-7 grid xs:grid-cols-2 lg:grid-cols-3 gap-3'>
        <Box href='/dashboard/orders' title='سفارش‌ ها' Icon={RiListCheck3} />
        <Box href='/dashboard/addresses' title='آدرس ها' Icon={RiListCheck3} />
        <Box href='/dashboard/account' title='جزئیات حساب' Icon={RiListCheck3} />

      </div>

    </div>
  )
}

export default page