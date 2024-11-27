import React, { useEffect, useState } from 'react'
import Range from './Range'
import toPersianNumber from '@/utils/toPersianNubmer';

type props = {
    setMinPrice: React.Dispatch<React.SetStateAction<number>>
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>
}

function Price({ setMaxPrice, setMinPrice }: props) {

    const [finalValues, setFinalValues] = useState<number[]>([0, 2_000_000])
    const [values, setValues] = React.useState([0, 2_000_000]);


    useEffect(() => {
        setMinPrice(finalValues[0])
    }, [finalValues[0]])

    useEffect(() => {
        setMaxPrice(finalValues[1])
    }, [finalValues[1]])


    return (
        <div className='border border-secondary p-4 rounded-md'>

            <h2 className='bg-secondary rounded-sm font-semibold py-2 px-4'>
                فیلتر قیمت
            </h2>

            <div className='mt-5'>
                <Range setFinalValues={setFinalValues} values={values} setValues={setValues} MAX={2_000_000} MIN={0} />
            </div>

            <p className='text-sm sm:text-base'> از {toPersianNumber(values[0].toLocaleString().toString())} تا {toPersianNumber((values[1].toLocaleString().toString()))} تومان</p>
        </div>
    )
}

export default Price