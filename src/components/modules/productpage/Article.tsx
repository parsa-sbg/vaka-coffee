import React from 'react'

type props = {
    desc: string
}

function Article({ desc }: props) {
    return (
        <div className='md:mx-14 xl:mx-36 border border-secondary rounded-xl p-5' dangerouslySetInnerHTML={{ __html: desc }}></div>
    )
}

export default Article