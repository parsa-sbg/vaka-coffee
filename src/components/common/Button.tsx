import Link from 'next/link'
import React from 'react'

type buttonLink = {
    text: string
    link: true
    href: string
}

type normalButton = {
    text: string
    link: false
    callback: () => void
}

function Button(props: normalButton | buttonLink) {

    console.log(props);


    return (
        <div>

            {props.link
                ? <Link className='block bg-main text-bgColer font-semibold px-7 py-2 rounded-md transition-all duration-300 hover:bg-bgColer hover:text-main' href={props.href}>{props.text}</Link>
                : <button className='bg-main text-bgColer font-semibold px-7 py-2 rounded-md transition-all duration-300 hover:bg-bgColer hover:text-main' onClick={props.callback}>{props.text}</button>
            }

        </div>
    )
}

export default Button