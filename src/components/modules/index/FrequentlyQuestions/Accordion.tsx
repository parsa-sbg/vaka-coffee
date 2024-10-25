"use client"
import React, { useState } from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";

type AccordionProps = {
  question: string
  content: string
}

function Accordion({ content, question }: AccordionProps) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`border-b border-secondary transition-all duration-500 ${isOpen && 'pb-6'}`}>

      <div className={`flex items-center justify-between cursor-pointer transition-all py-6 duration-300 ${isOpen && 'pb-6 text-main'}`} onClick={() => { setIsOpen(prev => !prev) }}>
        <p className='font-semibold'>{question}</p>
        <MdKeyboardArrowLeft className={`transition-all duration-300 ${isOpen && '-rotate-90'}`} size={25} />
      </div>

      <p className={`overflow-hidden max-h-0 transition-all duration-500 ${isOpen && '!max-h-40'}`}>
        {content}
      </p>

    </div>
  )
}

export default Accordion