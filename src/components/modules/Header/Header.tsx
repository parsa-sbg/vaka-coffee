import React from 'react'
import Logo from '../Logo/Logo'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import Link from 'next/link'
import Categories from './Categories'


function Header() {
    return (
        <div className=' fixed top-0 left-0 right-0 border-b-main border-b'>

            <div className='container flex items-center justify-between py-4'>

                <div className='flex items-center gap-5'>
                    <Logo />
                    <SearchBar />
                </div>

                <div className='flex items-center gap-5'>

                    <Categories />
                    <Link href={'/account'} className='hover:text-main duration-200'>تخفیف ها🔥</Link>
                    <Link href={'/account'} className='hover:text-main duration-200'>حساب کاربری من</Link>

                    <CartIcon />
                </div>

            </div>

        </div>
    )
}

export default Header