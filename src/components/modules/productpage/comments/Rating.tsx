import React, { useEffect, useState } from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'

type RatingProps = {
    onRatingChange: (score: number) => void
}

function Rating({ onRatingChange }: RatingProps) {

    const [shownScore, setShownScore] = useState(0)
    const [selectedScore, setSelectedScore] = useState(0)

    useEffect(() => {
        onRatingChange(selectedScore)
    }, [selectedScore])


    return (
        <div onMouseLeave={() => { setShownScore(selectedScore) }} className=''>
            <div className='flex items-center'>


                <div onClick={() => { setSelectedScore(1) }} onMouseEnter={() => { setShownScore(1) }} className='cursor-pointer'> {shownScore >= 1 ? <FaStar className='text-[#eabe12]' /> : <FaRegStar className='text-main' />} </div>
                <div onClick={() => { setSelectedScore(2) }} onMouseEnter={() => { setShownScore(2) }} className='cursor-pointer'> {shownScore >= 2 ? <FaStar className='text-[#eabe12]' /> : <FaRegStar className='text-main' />} </div>
                <div onClick={() => { setSelectedScore(3) }} onMouseEnter={() => { setShownScore(3) }} className='cursor-pointer'> {shownScore >= 3 ? <FaStar className='text-[#eabe12]' /> : <FaRegStar className='text-main' />} </div>
                <div onClick={() => { setSelectedScore(4) }} onMouseEnter={() => { setShownScore(4) }} className='cursor-pointer'> {shownScore >= 4 ? <FaStar className='text-[#eabe12]' /> : <FaRegStar className='text-main' />} </div>
                <div onClick={() => { setSelectedScore(5) }} onMouseEnter={() => { setShownScore(5) }} className='cursor-pointer'> {shownScore >= 5 ? <FaStar className='text-[#eabe12]' /> : <FaRegStar className='text-main' />} </div>

            </div>
        </div>
    )
}

export default Rating