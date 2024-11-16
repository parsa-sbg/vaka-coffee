import React from 'react'

type props = {
    hideModal: () => void
}

function CancelBtn({ hideModal }: props) {
    return (
        <button onClick={hideModal} className='text-nowrap w-full bg-main text-bgColer font-semibold px-4 py-1.5 rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main'>
            انصراف
        </button>
    )
}

export default CancelBtn