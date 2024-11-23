"use client"

import React, { useEffect, useState } from 'react'

type props = {
    intialName: string
}

function WelcomeTitle({ intialName }: props) {

    return (
        <p>سلام <span className='font-semibold'>{intialName}</span></p>
    )
}

export default WelcomeTitle