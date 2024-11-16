import { CategoryInterface } from '@/models/Category'
import mongoose from 'mongoose'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

type props = {
  categories: CategoryInterface[]

}

function CategorySelector({ categories }: props) {
  type selecctedCatIdType = mongoose.Types.ObjectId | null
  type buttonTextType = string

  const [isOpen, setIsOpen] = useState(false)
  const [selecctedCatId, setSelecctedCatIdId] = useState<selecctedCatIdType>(null)
  const [buttonText, setButtonText] = useState<buttonTextType>('انتخاب کنید')

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

  const OptionClickHandler = (selecctedCatId: selecctedCatIdType, title: buttonTextType) => {
    setSelecctedCatIdId(selecctedCatId)
    setButtonText(title)
    setIsOpen(false)
  }


  return (
    <div onClick={e => { e.stopPropagation() }} className='text-sm w-full'>
      <h5 className='mb-1 font-semibold'>دسته بندی</h5>

      <button
        onClick={btnClickHandler}
        className={`z-50 py-2 w-full px-1 pl-0 text-nowrap border-b min-w-40 flex items-center justify-between transition-all duration-300 ${isOpen && 'border-b-main'}`}>
        {buttonText}
        <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
      </button>

      <div className={`${isOpen && '!max-h-52 border'} w-full transition-all rounded-b-md duration-200 top-full bg-bgColer border-secondary left-0 max-h-0 overflow-hidden`}>

        {categories.map(cat => (

          <button key={cat._id.toString()} onClick={e => { OptionClickHandler(cat._id, cat.name) }} className='py-2 px-4 text-nowrap w-full hover:bg-[#0f0f0f] transition-all duration-200'>
            {cat.name}
          </button>

        ))}

      </div>

    </div>

  )
}

export default CategorySelector