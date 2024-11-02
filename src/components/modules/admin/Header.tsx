import Link from 'next/link'
import React from 'react'

function AdminHeader() {
    return (
        <div className='bg-[#0f0f0f] py-10'>
            <h1 className='text-center font-bold text-2xl'>پنل مدیریت</h1>
            {/* <p className='text-center text-xs mt-2'><Link className='opacity-80' href='/'>خانه</Link> / <span className='font-semibold'>حساب کاربری من</span></p> */}
        </div>
    )
}

export default AdminHeader