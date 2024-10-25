import Link from 'next/link'
import React from 'react'

function BottomNav() {
    return (
        <nav className='lg:hidden z-40 fixed bottom-0 right-0 left-0 grid grid-cols-6 py-3 border gap-1 border-secondary bg-bgColer'>


            <div className='cursor-pointer col-span-2 flex justify-center items-start group border-l'>
                <Link href={'/account'} className='group-hover:text-main duration-200 text-nowrap'>محصولات</Link>
            </div>

            <div className='cursor-pointer col-span-2 flex justify-center items-start group'>
                <Link href={'/account'} className='group-hover:text-main duration-200 text-nowrap'>تخفیف ها🔥</Link>
            </div>

            <div className='cursor-pointer col-span-2 flex justify-center items-start border-r group'>
                <Link href={'/account'} className='group-hover:text-main duration-200 text-nowrap'>حساب کاربری من</Link>
            </div>

        </nav>
    )
}

export default BottomNav