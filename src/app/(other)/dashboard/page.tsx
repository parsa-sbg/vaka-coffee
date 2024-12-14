import Box from '@/components/modules/dashboard/index/Box'
import WelcomeTitle from '@/components/modules/dashboard/index/WelcomeTitle';
import { connectToDataBase } from '@/models';
import { authUserWithToken } from '@/utils/server/auth';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'
import { RiListCheck3 } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { LiaAddressCardSolid } from "react-icons/lia";


async function page() {

  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)
  if (!user) redirect('/login')

  return (
    <div className=''>

      <WelcomeTitle intialName={user.name} />
      <p className='mt-3'>از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب کاربری و کلمه عبور خود را ویرایش کنید.</p>

      <div className='mt-7 grid xs:grid-cols-2 lg:grid-cols-3 gap-3'>
        <Box href='/dashboard/orders' title='سفارش‌ ها' Icon={RiListCheck3} />
        <Box href='/dashboard/address' title='آدرس' Icon={CiLocationOn} />
        <Box href='/dashboard/account' title='جزئیات حساب' Icon={LiaAddressCardSolid} />

      </div>

    </div>
  )
}

export default page

export const metadata: Metadata = {
  title: "داشبورد",
};
