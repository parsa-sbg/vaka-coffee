import InfoBox from '@/components/modules/dashboard/account/InfoBox'
import PasswordBox from '@/components/modules/dashboard/account/PasswordBox'
import PhoneBox from '@/components/modules/dashboard/account/PhoneBox'
import React from 'react'

function page() {
  return (
    <div className='bg-[#0f0f0f] grid md:grid-cols-2 gap-4 p-4 md:p-8 md:gap-8 rounded-3xl'>

      <div className='bg-bgColer p-3 sm:p-5 shadow-secondary rounded-2xl md:col-span-2'><InfoBox /></div>
      <div className='bg-bgColer p-3 sm:p-5 shadow-secondary rounded-2xl'><PasswordBox /></div>
      <div className='bg-bgColer p-3 sm:p-5 shadow-secondary rounded-2xl'><PhoneBox /></div>

    </div>
  )
}

export default page