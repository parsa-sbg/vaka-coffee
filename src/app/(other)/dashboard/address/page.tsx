import AddressInfo from '@/components/modules/dashboard/address/AddressInfo'
import { connectToDataBase } from '@/models'
import { authUserWithToken } from '@/utils/server/auth'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
const provincese: { id: number, name: string }[] = require('@/app/api/locations/data/provinces.json')

async function page() {


  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)
  if (!user) redirect('/login')

  return (
    <AddressInfo provinces={JSON.parse(JSON.stringify(provincese))} intialAddress={user.address ? JSON.parse(JSON.stringify(user.address)) : undefined} />
  )
}

export default page


export const metadata: Metadata = {
  title: "داشبورد - آدرس",
};
