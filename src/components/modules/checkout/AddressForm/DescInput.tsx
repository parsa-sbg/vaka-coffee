import React from 'react'

type props = {
    description: string
    setDescription: React.Dispatch<React.SetStateAction<string>>
}

function DescInput({ description, setDescription }: props) {
    return (
        <div className={`flex flex-col gap-0.5 basis-3/4`}>
            <h5 className='mb-1 font-semibold transition-all duration-300'>توضیحات (اختیاری)</h5>
            <textarea onChange={e => {
                setDescription(e.target.value)
            }} value={description} placeholder='یادداشت های سفارش شما، به عنوان مثال یادداشت های ویژه در مورد تحویل.' className={` custom-scrollbar h-26 resize-none transition-all duration-300 outline-none rounded-md border border-transparent focus:border-main py-1.5 px-3 bg-bgColer`} />
        </div>
    )
}

export default DescInput