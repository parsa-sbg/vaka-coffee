import { categoryModel, connectToDataBase } from '@/models';
import { CategoryInterface } from '@/models/Category';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { ImLocation2 } from "react-icons/im";


async function Footer() {


    connectToDataBase()

    const twoRandomCategory: CategoryInterface[] = await categoryModel.aggregate([
        { $sample: { size: 3 } }
    ])

    return (
        <footer className='mt-16 border-t border-main pt-16'>

            <div className='grid grid-cols-5 gap-1'>
                <div className='col-span-2'>
                    <ul className='flex-col justify-center flex gap-6'>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://www.google.com/maps?hl=en&q=35.7403192%2C51.4353059&z=17' >
                                شعبه سهروردی
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://goo.gl/maps/Zi9xTLyfhiWntyiZA' >
                                شعبه شهرک غرب
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://goo.gl/maps/wYm6N11jNXjPhnBKA' >
                                شعبه اباذر
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://www.google.com/maps?hl=en&q=35.72721481323242,51.379520416259766&z=17' >
                                شعبه گیشا
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://goo.gl/maps/1NJBFJXoqbYqLMnF7' >
                                شعبه یوسف آباد
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://maps.app.goo.gl/NuHjLVeibdw8zXLn7' >
                                شعبه فاطمی
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://maps.app.goo.gl/Gi7fW8kEb6ou2V2R6' >
                                شعبه اندرزگو
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://maps.app.goo.gl/hrfVNLsr6oKMA9F2A' >
                                شعبه جمهوری
                            </Link>
                        </li>
                        <li className=' flex w-fit items-center gap-0.5 sm:gap-2'>
                            <ImLocation2 className='text-main' size={15} />
                            <Link className='transition-all duration-300  hover:text-main text-xs sm:text-base' href='https://maps.app.goo.gl/2fc8n9N8mUNPe7sc9' >
                                شعبه ونک
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='h-full my-auto mx-auto col-span-1'>
                    <div className='max-w-32 flex items-center h-full'>
                        <Image className='w-full' width={200} height={200} alt='Logo' src={'/logo.png'}></Image>
                    </div>
                </div>

                <div className='flex justify-end col-span-2'>
                    <ul className='flex-col flex justify-center items-end gap-6'>
                        <li className=' flex w-fit gap-2'>
                            <Link className='transition-all text-left duration-300 hover:text-main text-xs sm:text-base' href='/articles' >
                                باشگاه مشتربان قهوه واکا
                            </Link>
                        </li>

                        {twoRandomCategory.map(cat => (
                            <li key={cat._id.toString()} className=' flex w-fit gap-2'>
                                <Link className='transition-all text-left duration-300 hover:text-main text-xs sm:text-base' href={`/categories/${cat.shortName}`} >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}


                    </ul>
                </div>
            </div>


        </footer>
    )
}

export default Footer