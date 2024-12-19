"use client";
import React, { useCallback, useEffect, useState } from 'react';
import Logo from '../../modules/Logo/Logo';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import Link from 'next/link';
import Categories from './Categories';
import { CartItemInterface } from '@/models/Cart';
import { CategoryInterface } from '@/models/Category';

type Props = {
    userIntialCart: CartItemInterface[] | null;
    categories: CategoryInterface[];
};

function Header({ userIntialCart, categories }: Props) {
    const [_scrollTop, setScrollTop] = useState(0);
    const [isScrolledTop, setIsScrolledTop] = useState(true);

    const throttle = (func: Function, limit: number) => {
        let inThrottle = false;
        return (...args: any[]) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false;
                }, limit);
            }
        };
    };

    const scrollHandler = useCallback(() => {
        setScrollTop(prev => {
            const currentScrollY = window.scrollY;
            if (Math.abs(prev - currentScrollY) < 30) return prev;

            setIsScrolledTop(currentScrollY < prev);
            return currentScrollY;
        });
    }, []);


    useEffect(() => {
        const throttledScrollHandler = throttle(scrollHandler, 30);
        const handleScroll = () => {
            requestAnimationFrame(throttledScrollHandler);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollHandler]);

    return (
        <header
            className={`${isScrolledTop ? 'top-0' : '-top-20'
                } z-40 fixed left-0 right-0 border-b-main border-b bg-bgColer transition-all duration-200`}
        >
            <div className="container relative flex items-center justify-between py-4 gap-2 lg:gap-5">
                <div className="flex items-center w-full gap-2 lg:gap-5">
                    <Logo />
                    <SearchBar />
                </div>

                <div className="flex items-center gap-2 lg:gap-5">
                    <div className="items-center gap-5 hidden lg:flex">
                        <Categories categories={categories} />
                        <Link href="/off" className="hover:text-main duration-200 text-nowrap">
                            تخفیف ها🔥
                        </Link>
                        <Link href="/dashboard" className="hover:text-main duration-200 text-nowrap">
                            حساب کاربری من
                        </Link>
                    </div>

                    <div className={`${isScrolledTop ? '' : 'scale-0 transition-transform duration-300'}`}>
                        <CartIcon userIntialCart={userIntialCart || []} />
                    </div>

                </div>
            </div>

            <div className={`${isScrolledTop ? 'scale-0' : ''} bg-bgColer rounded-full p-1 border border-secondary fixed left-2 md:left-4 top-5 transition-all duration-300`}>
                <CartIcon userIntialCart={userIntialCart} />
            </div>
        </header>
    );
}

export default Header;