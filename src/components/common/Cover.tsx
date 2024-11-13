import React from 'react'

type props = {
    onClick?: () => void
    visible: boolean
}

function Cover({ onClick, visible }: props) {
    console.log(visible);

    return (
        <div onClick={onClick} className={`${visible ? '!opacity-100 visible' : 'opacity-0 invisible'} z-40 transition-all duration-500 fixed top-0 left-0 w-screen h-screen backdrop-blur-sm`}></div>
    )
}

export default Cover