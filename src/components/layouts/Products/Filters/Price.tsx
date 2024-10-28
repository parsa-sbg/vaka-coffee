import React from 'react'
import Range from './Range'
import toPersionNumber from '@/utils/toPersianNubmer';


function Price() {

    const [values, setValues] = React.useState([0, 3_000_000]);

    return (
        <div className='border border-secondary p-4 rounded-md'>

            <h2 className='bg-secondary rounded-sm font-semibold py-2 px-4'>
                فیلتر قیمت
            </h2>

            <div className='mt-5'>
                <Range values={values} setValues={setValues} MAX={3_000_000} MIN={0} />
            </div>

            <p className='text-sm sm:text-base'> از {toPersionNumber(values[0].toLocaleString().toString())} تا {toPersionNumber(values[1].toLocaleString().toString())} تومان</p>
        </div>
    )
}

export default Price