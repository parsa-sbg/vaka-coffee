import Button from '@/components/common/Button'
import React from 'react'

function page() {
  return (
    <div className=''>
      <p>آدرس‌ زیر به طور پیش‌فرض در صفحه پرداخت مورد استفاده قرار می‌گیرد.</p>

      <div className='flex items-center gap-3 mt-3'>
        <h4 className='font-semibold text-lg'>آدرس شما</h4>
        <div className='text-xs'><Button link text='ویرایش' href='/dashboard/address/edit'></Button></div>
      </div>

      <div className='mt-3 flex flex-col gap-3'>

        <div className='flex items-center gap-5'>
          <span className='min-w-12'>نام</span>
          <span className='text-main font-semibold'>ثنا</span>
        </div>

        <div className='flex items-center gap-5'>
          <span className='min-w-12'>فامیل</span>
          <span className='text-main font-semibold'>محمودی</span>
        </div>

        <div className='flex items-center gap-5'>
          <span className='min-w-12'>استان</span>
          <span className='text-main font-semibold'>تهران</span>
        </div>

        <div className='flex items-center gap-5'>
          <span className='min-w-12'>شهر</span>
          <span className='text-main font-semibold'>تهران</span>
        </div>

        <div className='flex items-center gap-5'>
          <span className='min-w-12'>آدرس</span>
          <span className='text-main font-semibold'>بلوار فلان کوچه 5 پلاک 1</span>
        </div>

        <div className='flex items-center gap-5'>
          <span className='min-w-12'>پلاک</span>
          <span className='text-main font-semibold'>69486949</span>
        </div>

      </div>

    </div>
  )
}

export default page