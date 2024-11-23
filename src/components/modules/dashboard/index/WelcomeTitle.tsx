"use client"

import { useUserInfo } from '@/contexts/userInfoContext'
import React, { useEffect, useState } from 'react'

type props = {
    intialName: string
}

function WelcomeTitle({ intialName }: props) {


    const [name, setName] = useState(intialName)
    const { name: contextName } = useUserInfo()

    useEffect(() => {
        setName(intialName)
    }, [contextName])


    return (
        <p>سلام <span className='font-semibold'>{name}</span></p>
    )
}

export default WelcomeTitle