import Image from 'next/image'
import React from 'react'

function Baner() {
    return (
        <section className='my-16 py-20 flex items-center justify-center md:justify-start bg-[url(https://vakacoffee.com/wp-content/uploads/2023/03/14011221005.jpg)] object-fill bg-cover bg-no-repeat'>
            <div className='max-w-52 sm:max-w-64 md:max-w-80 md:mr-10'>
                <Image className='block w-full h-full' alt='vaka logo' width={200} height={200} src='https://vakacoffee.com/wp-content/uploads/2023/03/14011221001-e1678730159971-1024x368.png'></Image>
            </div>
        </section>
    )
}

export default Baner