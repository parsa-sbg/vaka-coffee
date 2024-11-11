import React from 'react'


type props = {
    name: string
}

function Title({ name }: props) {

    return (
        <div>
            <p>سلام <span className='font-bold text-lg'>{name}</span></p>
            <p className='mt-3'>از طریق پیشخوان پنل مدیریت، می‌توانید تمام سفارش‌ ها را مشاهده، و کاربران و محصولات را مدیریت کنید.</p>
        </div>
    )
}

export default Title