import Box from '@/components/modules/dashboard/index/Box'
import WelcomeTitle from '@/components/modules/dashboard/index/WelcomeTitle';
import { connectToDataBase } from '@/models';
import { authUserWithToken } from '@/utils/server/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import { RiListCheck3 } from "react-icons/ri";


async function page() {

  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)
  if (!user) redirect('/')

  return (
    <div className=''>

      <WelcomeTitle intialName={user.name} />
      <p className='mt-3'>از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب کاربری و کلمه عبور خود را ویرایش کنید.</p>

      <div className='mt-7 grid xs:grid-cols-2 lg:grid-cols-3 gap-3'>
        <Box href='/dashboard/orders' title='سفارش‌ ها' Icon={RiListCheck3} />
        <Box href='/dashboard/address' title='آدرس' Icon={RiListCheck3} />
        <Box href='/dashboard/account' title='جزئیات حساب' Icon={RiListCheck3} />

      </div>

    </div>
  )
}

export default page