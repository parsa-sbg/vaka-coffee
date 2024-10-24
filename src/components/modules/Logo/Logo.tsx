import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'}>
        <Image src={'/logo-en.png'} alt='logo' width={200} height={100} className='max-w-28 sm:max-w-36 lg:max-w-40' />
    </Link>
  )
}

export default Logo