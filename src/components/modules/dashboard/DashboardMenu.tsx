import React from 'react'
import DashboardMenuItem from './DashboardMenuItem'
import LogOUtBtn from '../../common/LogOUtBtn'

function DashboardMenu() {


  return (
    <div className='border-b sm:border-none sm:pb-0 pb-2 border-secondary'>
      <h3 className='font-semibold text-lg bg-secondary py-2 px-4 mb-2 rounded-md border-b border-b-secondary'>حساب کاربری من</h3>

      <ul className='flex flex-col gap-2'>

        <DashboardMenuItem text='پیشخوان' href='/dashboard' />
        <DashboardMenuItem activeWhenStartsWith='/dashboard/orders' text='سفارش‌ ها' href='/dashboard/orders' />
        <DashboardMenuItem text='آدرس' href='/dashboard/address' />
        <DashboardMenuItem text='جزئیات حساب' href='/dashboard/account' />

        <LogOUtBtn />

      </ul>

    </div>
  )
}

export default DashboardMenu