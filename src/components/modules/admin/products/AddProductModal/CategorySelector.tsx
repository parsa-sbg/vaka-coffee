import { CategoryInterface } from '@/models/Category'
import mongoose from 'mongoose'
import React, { useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { errorsType } from './AddProductModal'

type props = {
  categories: CategoryInterface[]
  category: React.Dispatch<React.SetStateAction<mongoose.Types.ObjectId | null>>
  error: boolean
  setErrors: React.Dispatch<React.SetStateAction<errorsType>>
}

function CategorySelector({ categories, category, error, setErrors }: props) {
  type buttonTextType = string
  type selectedCatIdType = mongoose.Types.ObjectId | null

  const [isOpen, setIsOpen] = useState(false)
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
    setErrors(prev => ({ ...prev, category: false }))
  }

  const OptionClickHandler = (selecctedCatId: selectedCatIdType, title: buttonTextType) => {
    category(selecctedCatId)
    setErrors(prev => ({ ...prev, category: false }))
    setButtonText(title)
    setIsOpen(false)
  }


  return (
    <div onClick={e => { e.stopPropagation() }} className={`text-sm w-full ${error ? 'text-red-600' : ''}`}>
      <h5 className='mb-1 font-semibold transition-all duration-300'>دسته بندی</h5>

      <button
        onClick={btnClickHandler}
        className={`${error ? '!border-red-600' : ''} z-50 py-2 w-full px-1 pl-0 text-nowrap border-b min-w-40 flex items-center justify-between transition-all duration-300 ${isOpen && 'border-b-main'}`}>
        {buttonText}
        <MdKeyboardArrowLeft className={`transition-transform duration-300 ${isOpen && '-rotate-90'}`} size={25} />
      </button>

      <div className={`${isOpen && '!max-h-52 border'} w-full transition-all rounded-b-md duration-200 top-full bg-bgColer border-secondary left-0 max-h-0 overflow-hidden`}>

        {categories.map(cat => (

          <button key={cat._id.toString()} onClick={() => { OptionClickHandler(cat._id, cat.name) }} className='py-2 px-4 text-nowrap w-full hover:bg-[#0f0f0f]'>
            {cat.name}
          </button>

        ))}

      </div>

    </div>

  )
}

export default CategorySelector