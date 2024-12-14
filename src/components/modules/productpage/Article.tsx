import React from 'react'

type props = {
    desc: string
}

function Article({ desc }: props) {
    return (
        <div dangerouslySetInnerHTML={{ __html: desc }}></div>
    )
}

export default Article