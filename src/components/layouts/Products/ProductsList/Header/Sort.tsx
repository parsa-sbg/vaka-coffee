import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";


function Sort() {

    type selectedSortType = 'priceHighToLow' | 'priceLowToHigh' | 'latest' | 'score'
    type buttonTextType = 'مرتب سازی بر اساس آخرین' | 'مرتب سازی بر اساس امتیاز' | 'مرتب سازی بر اساس ارزان ترین' | 'مرتب سازی بر اساس گران ترین'

    const [isOpen, setIsOpen] = useState(false)
    const [selectedSort, setSelectedSort] = useState<selectedSortType>('latest')
    const [buttonText, setButtonText] = useState<buttonTextType>('مرتب سازی بر اساس آخرین')

    const windowClickhandler = useCallback(() => {
        isOpen && setIsOpen(false)
    }, [isOpen])


    useEffect(() => {
        window.addEventListener('click', windowClickhandler)
        return () => {
            window.removeEventListener('click', windowClickhandler)
        }
    }, [windowClickhandler])


    const btnClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        setIsOpen(prev => !prev)
    }

    const OptionClickHandler = (selectedSort: selectedSortType, title: buttonTextType) => {
        setSelectedSort(selectedSort)
        setButtonText(title)
        setIsOpen(false)
    }

    return (
        <div onClick={e => { e.stopPropagation() }} className='relative text-sm '>

            <button
                onClick={btnClickHandler}
                className={`z-50 py-2 px-1 pl-0 text-nowrap border-b min-w-52 flex items-center justify-between transition-all duration-300 ${isOpen && 'border-b-main'}`}>
                {buttonText}
                <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
            </button>

            <div className={`${isOpen && '!max-h-52 border'} w-fit absolute right-0 transition-all rounded-b-md duration-200 top-full bg-bgColer border-secondary left-0 max-h-0 overflow-hidden`}>

                <button onClick={e => { OptionClickHandler('latest', 'مرتب سازی بر اساس آخرین') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    مرتب سازی بر اساس آخرین
                </button>

                <button onClick={e => { OptionClickHandler('score', 'مرتب سازی بر اساس امتیاز') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    مرتب سازی بر اساس امتیاز
                </button>

                <button onClick={e => { OptionClickHandler('priceLowToHigh', 'مرتب سازی بر اساس ارزان ترین') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    مرتب سازی بر اساس ارزان ترین
                </button>

                <button onClick={e => { OptionClickHandler('priceHighToLow', 'مرتب سازی بر اساس گران ترین') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                    مرتب سازی بر اساس گران ترین
                </button>

            </div>

        </div>
    )
}

export default Sort