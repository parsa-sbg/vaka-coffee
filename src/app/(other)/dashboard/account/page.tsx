import InfoBox from '@/components/modules/dashboard/account/InfoBox'
import PasswordBox from '@/components/modules/dashboard/account/PasswordBox'
import PhoneBox from '@/components/modules/dashboard/account/PhoneBox'
import UserNameBox from '@/components/modules/dashboard/account/UserNameBox'
import { connectToDataBase } from '@/models'
import { authUserWithToken } from '@/utils/server/auth'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {


  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)
  if (!user) redirect('/login')


  return (
    <div className='bg-[#0f0f0f] grid md:grid-cols-3 gap-4 p-4 lg:p-8 lg:gap-8 rounded-3xl'>

      <div className='bg-bgColer p-3 lg:p-4 shadow-secondary rounded-2xl md:col-span-3'><InfoBox intialUserInfos={{ name: user.name, email: user.email, lastName: user.lastName }} /></div>
      <div className='bg-bgColer p-3 lg:p-4 shadow-secondary rounded-2xl'><PasswordBox /></div>
      <div className='bg-bgColer p-3 lg:p-4 shadow-secondary rounded-2xl'><PhoneBox intialNumber={user.phone} /></div>

      <div className='bg-bgColer p-3 lg:p-4 shadow-secondary rounded-2xl'><UserNameBox serverIntialUserName={user.username} /></div>

    </div>
  )
}

export default page

export const metadata: Metadata = {
  title: "داشبورد - حساب",
};
