import Link from 'next/link'
import React from 'react'
import { GrInstagram } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";



function FooterBottom() {
    return (
        <div className='bg-secondary py-5 mt-10'>
            <div className='container grid gap-6 text-xs grid-cols-1 md:grid-cols-3'>

                <Link className='flex gap-2 mx-auto md:mx-0 items-center transition-colors duration-300 hover:text-main' href='https://instagram.com/vakacoffee'>
                    <div className='bg-main rounded-full p-1.5'>
                        <GrInstagram color='white' />
                    </div>
                    به پیجمون هم سر بزن!
                </Link>

                <div className='flex justify-center gap-2 flex-col text-center'>
                    <p className='text-inherit'>این یک سایت کلون شده ( با تغییرات ) از وبسایت واکاکافی به این <Link className='text-main font-semibold' href='https://vakacoffee.com/'>آدرس</Link> هست و فاقد هرگونه کاربرد تجاری میباشد.</p>
                    <Link className='text-main text-sm' href='https://zenbranding.agency/' >طراح برند : آژانس برندسازی ذن</Link>
                </div>

                <div className='flex gap-2 mx-auto md:mx-0 items-center md:mr-auto'>
                    <p>پشتیبانی سایت: 09192928455 - 09126272166</p>
                    <div className='bg-main rounded-full p-1.5'>
                        <FaPhoneAlt color='white' />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FooterBottom