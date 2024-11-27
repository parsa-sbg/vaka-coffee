import toPersianNumber from '@/utils/toPersianNubmer'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

function Weight() {

    type selectedWeightType = null | 250 | 500 | 750 | 1_000
    type buttonTextType = 'همه وزن ها' | '250 گرم' | '500 گرم' | '750 گرم' | '1 کیلو گرم'

    const [isOpen, setIsOpen] = useState(false)
    const [selectedWeight, setSelectedWeight] = useState<selectedWeightType>(null)
    const [buttonText, setButtonText] = useState<buttonTextType>('همه وزن ها')

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

    const OptionClickHandler = (selectedWeight: selectedWeightType, title: buttonTextType) => {
        setSelectedWeight(selectedWeight)
        setButtonText(title)
        setIsOpen(false)
    }

    return (
        <div className='border border-secondary p-4 rounded-md'>

            <h2 className='bg-secondary rounded-sm font-semibold py-2 px-4'>
                فیلتر وزن
            </h2>

            <div onClick={e => { e.stopPropagation() }} className='relative text-sm mt-5'>

                <button
                    onClick={btnClickHandler}
                    className={`z-50 px-4 py-2 pl-1 ${isOpen && '!border-main'} text-nowrap w-full flex items-center rounded-sm border border-transparent bg-[#0f0f0f] justify-between transition-all duration-300`}>
                    {buttonText}
                    <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
                </button>

                <div className={`${isOpen && '!max-h-52 border-x border-b'} absolute right-0 transition-all rounded-b-md duration-200 top-full border-secondary bg-[#0f0f0f] left-0 max-h-0 overflow-hidden`}>

                    <button onClick={e => { OptionClickHandler(null, 'همه وزن ها') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                        همه وزن ها
                    </button>

                    <button onClick={e => { OptionClickHandler(250, '250 گرم') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                        {toPersianNumber('250 گرم')}
                    </button>

                    <button onClick={e => { OptionClickHandler(500, '500 گرم') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                        {toPersianNumber('500 گرم')}
                    </button>

                    <button onClick={e => { OptionClickHandler(750, '750 گرم') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                        {toPersianNumber('750 گرم')}
                    </button>

                    <button onClick={e => { OptionClickHandler(1_000, '1 کیلو گرم') }} className='py-2 px-4 text-nowrap w-full hover:bg-secondary transition-all duration-200'>
                        {toPersianNumber('1 کیلو گرم')}
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Weight