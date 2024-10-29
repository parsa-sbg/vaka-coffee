import React from 'react'
import DashboardMenuItem from './DashboardMenuItem'

function DashboardMenu() {


  return (
    <div className='border-b sm:border-none sm:pb-0 pb-2 border-secondary'>
      <h3 className='font-semibold text-lg bg-secondary py-2 px-4 mb-2 rounded-md border-b border-b-secondary'>حساب کاربری من</h3>

      <ul className='flex flex-col gap-2'>

        <DashboardMenuItem text='پیشخوان' href='/dashboard' />
        <DashboardMenuItem text='سفارش‌ ها' href='/dashboard/orders' />
        <DashboardMenuItem text='آدرس ها' href='/dashboard/addresses' />
        <DashboardMenuItem text='جزئیات حساب' href='/dashboard/account' />

        <li>
          <button className='text-right py-2 px-4 rounded-md transition-all duration-200 hover:bg-[#0f0f0f] hover:text-main w-full'>خروج</button>
        </li>

      </ul>

    </div>
  )
}

export default DashboardMenu