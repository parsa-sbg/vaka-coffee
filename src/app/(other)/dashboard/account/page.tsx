import InfoBox from '@/components/modules/dashboard/account/InfoBox'
import PasswordBox from '@/components/modules/dashboard/account/PasswordBox'
import PhoneBox from '@/components/modules/dashboard/account/PhoneBox'
import { connectToDataBase } from '@/models'
import { authUserWithToken } from '@/utils/server/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {


  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)
  if (!user) redirect('/login')


  return (
    <div className='bg-[#0f0f0f] grid md:grid-cols-2 gap-4 p-4 md:p-8 md:gap-8 rounded-3xl'>

      <div className='bg-bgColer p-3 sm:p-5 shadow-secondary rounded-2xl md:col-span-2'><InfoBox intialUserInfos={{ name: user.name, email: user.email, lastName: user.lastName }} /></div>
      <div className='bg-bgColer p-3 sm:p-5 shadow-secondary rounded-2xl'><PasswordBox /></div>
      <div className='bg-bgColer p-3 sm:p-5 shadow-secondary rounded-2xl'><PhoneBox intialNumber={user.phone} /></div>

    </div>
  )
}

export default page