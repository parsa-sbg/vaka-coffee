import React from 'react'
import Logo from '../../modules/Logo/Logo'
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import Link from 'next/link'
import Categories from './Categories'
import { cookies } from 'next/headers'
import { authUserWithToken } from '@/utils/server/auth'
import { CartModel, connectToDataBase } from '@/models'
import { CartItemInterface } from '@/models/Cart'

async function Header() {
    let userIntialCart: CartItemInterface[] | null = null

    const token = (await cookies()).get('token')?.value
    const user = await authUserWithToken(token)
    if (user) {
        connectToDataBase()
        const targetCart = await CartModel.findOne({ user: user._id })
        if (targetCart) {
            userIntialCart = targetCart.cart
        }
    }

    return (
        <header className='z-40 fixed top-0 left-0 right-0 border-b-main border-b bg-bgColer'>

            <div className='container flex items-center justify-between py-4 gap-2 lg:gap-5'>

                <div className='flex items-center w-full gap-2 lg:gap-5'>
                    <Logo />
                    <SearchBar />
                </div>

                <div className='flex items-center gap-2 lg:gap-5'>

                    <div className='items-center gap-5 hidden lg:flex'>
                        <Categories />
                        <Link href={'/off'} className='hover:text-main duration-200 text-nowrap'>تخفیف ها🔥</Link>
                        <Link href={'/dashboard'} className='hover:text-main duration-200 text-nowrap'>حساب کاربری من</Link>
                    </div>

                    <CartIcon userIntialCart={JSON.parse(JSON.stringify(userIntialCart))} />
                </div>

            </div>

        </header>
    )
}

export default Header