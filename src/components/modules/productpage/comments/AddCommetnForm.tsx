"use client"
import React from 'react'
import Rating from './Rating'
import Button from '@/components/common/Button'

function AddCommetnForm() {
    return (
        <div className='h-96'>
            <h3 className='font-semibold text-lg'>دیدگاه خود را بنویسید</h3>
            <div className='mt-2 flex gap-2'>
                <span>امتیاز شما :</span>
                <Rating onRatingChange={() => { }} />
            </div>

            <form action="">
                <textarea className='w-full bg-transparent outline-none border border-secondary resize-y rounded-md mt-5 max-h-64 h-48 min-h-36 p-3' placeholder='دیدگاه شما...' name="" id=""></textarea>
                <Button link={false} callback={() => { }} text='ثبت' />
            </form>


        </div>
    )
}

export default AddCommetnForm