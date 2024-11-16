import React from 'react'

function NameInput() {
    return (
        <div className=' flex flex-col gap-1'>
            <h5 className='mb-1 font-semibold'>نام محصول</h5>
            <input className='outline-none rounded-md border border-transparent focus:border-main transition-all duration-300 py-1.5 px-3 bg-bgColer' type="text" />
        </div>
    )
}

export default NameInput