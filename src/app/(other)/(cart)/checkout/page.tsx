import Page from '@/components/modules/checkout/Page'
import { connectToDataBase } from '@/models'
import { authUserWithToken } from '@/utils/server/auth'
import { cookies } from 'next/headers'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'

const provincese: { id: number, name: string }[] = require('@/app/api/locations/data/provinces.json')


async function page() {

  connectToDataBase()
  const token = (await cookies()).get('token')?.value
  const user = await authUserWithToken(token)

  if (!user) {
    redirect('/login', RedirectType.replace)
  }


  return (
    <Page intialPhone={JSON.parse(JSON.stringify(user.phone))} provinces={JSON.parse(JSON.stringify(provincese))} intialAddress={user.address ? JSON.parse(JSON.stringify(user.address)) : undefined} />
  )
}

export default page