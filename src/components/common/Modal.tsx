import React from 'react'

type props = {
    isModalShow: boolean,
    coverClickhandler: () => void
}

function Modal({ isModalShow, children, coverClickhandler }: React.PropsWithChildren<props>) {

    return (
        <div className={`modal ${isModalShow ? '' : 'invisible'} z-50 flex justify-center items-center fixed w-screen h-screen top-0 left-0 transition-all duration-200`}>
            <div className={`${isModalShow ? '!opacity-100 visible' : 'opacity-0 invisible'} flex items-center h-full m-auto z-50 transition-all duration-200`}>
                {children}
            </div>
            <div onClick={coverClickhandler} className={`${isModalShow ? '!opacity-100 visible' : 'opacity-0 invisible'} z-40 transition-all duration-200 fixed top-0 left-0 w-screen h-screen backdrop-blur-sm`}></div>
        </div>
    )
}

export default Modal