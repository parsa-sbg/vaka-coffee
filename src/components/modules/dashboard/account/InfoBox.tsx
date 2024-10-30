import React from 'react'

function InfoBox() {
  return (
    <div className=''>
      <h3 className='pr-3 relative before:absolute before:w-2 before:h-2 before:rounded-full before:right-0 before:top-0 before:bottom-0 before:my-auto before:bg-main'>اطلاعات شخصی</h3>
      <div className='mt-5 h-full grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-3.5 xl:gap-4'>

        <div className='w-full flex flex-col gap-2 sm:col-span-3 lg:col-span-3'>
          <label className='text-sm' htmlFor="name">نام</label>
          <input
            placeholder='نام'
            id='name'
            className=' disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main'
            type="text" />
        </div>

        <div className='w-full flex flex-col gap-2 sm:col-span-3 lg:col-span-3'>
          <label className='text-sm' htmlFor="name">نام خانوادگی</label>
          <input
            placeholder='نام خانوادگی'
            id='name'
            className=' disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main'
            type="text" />
        </div>

        <div className='w-full flex flex-col gap-2 col-span-2 sm:col-span-4 lg:col-span-4'>
          <label className='text-sm' htmlFor="name">آدرس ایمیل</label>
          <input
            placeholder='آدرس ایمیل'
            id='name'
            className=' disabled:cursor-not-allowed min-w-28 w-full disabled:!text-opacity-30 text-white bg-secondary px-2 py-1 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main'
            type="text" />
        </div>

        <div className='flex flex-col justify-end col-span-2 sm:col-span-2 lg:col-span-2'>
          <button className='text-nowrap bg-main text-bgColer text-sm px-2 w-full py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>ذخیره اطلاعات</button>
        </div>

      </div>
    </div>
  )
}

export default InfoBox