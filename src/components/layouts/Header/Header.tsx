import React from 'react'
import Logo from '../../modules/Logo/Logo'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import Link from 'next/link'
import Categories from './Categories'


function Header() {

    // const [test] = useState()
    return (
        <header className=' fixed top-0 left-0 right-0 border-b-main border-b bg-bgColer'>

            <div className='container flex items-center justify-between py-4 gap-2 lg:gap-5'>

                <div className='flex items-center w-full gap-2 lg:gap-5'>
                    <Logo />
                    <SearchBar />
                </div>

                <div className='flex items-center gap-2 lg:gap-5'>

                    <div className='items-center gap-5 hidden lg:flex'>
                        <Categories />
                        <Link href={'/account'} className='hover:text-main duration-200 text-nowrap'>تخفیف ها🔥</Link>
                        <Link href={'/account'} className='hover:text-main duration-200 text-nowrap'>حساب کاربری من</Link>
                    </div>

                    <CartIcon />
                </div>

            </div>

        </header>
    )
}

export default Header