import React from 'react'


type props = {
    name: string
    role: 'ADMIN' | 'OWNER' | 'USER'
}

function Title({ name, role }: props) {

    return (
        <div>
            <p>سلام <span className='font-bold text-lg'>{name}</span> ( {role == 'ADMIN' ? 'ادمین' : 'مالک' } ) </p>
            <p className='mt-3'>از طریق پیشخوان پنل مدیریت، می‌توانید تمام سفارش‌ ها را مشاهده، و کاربران و محصولات را مدیریت کنید.</p>
        </div>
    )
}

export default Title