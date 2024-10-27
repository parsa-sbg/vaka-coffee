import React from 'react'
import { FaSearch } from "react-icons/fa";


function SearchBar() {
    return (
        <div className='relative w-full md:max-w-96'>
            <input
                className='w-full bg-secondary pr-2 lg:pr-4 pl-8 py-2 rounded-md outline-none border-2 border-transparent transition-colors duration-200 focus:border-main'
                type="text"
                placeholder='جستجوی محصولات' />
            <div className='cursor-pointer p-1 absolute left-2 top-0 bottom-0 my-auto flex items-center justify-center'>
                <FaSearch className='' />
            </div>
        </div>
    )
}

export default SearchBar