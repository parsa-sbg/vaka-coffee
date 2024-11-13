"use client"
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/useModal'
import { CategoryInterface } from '@/models/Category'
import { categorySchema } from '@/validation/category'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdAddCircleOutline } from 'react-icons/io'

function Header({ setCategories }: { setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>> }) {

    const { showModal, hideModal, isModalShow } = useModal()
    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [errors, setErrors] = useState({ name: false, shortName: false })

    const createCategory = async () => {

        const parsedData = categorySchema.safeParse({ name, shortName })
        console.log(parsedData);
        if (!parsedData.success) {
            parsedData.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: 'top-left'
                })
                setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
            })
            return false
        }


        const res = await fetch('/api/categories', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                shortName
            })
        })

        if (res.status == 201) {
            const data = await res.json()
            setCategories(data.allCategories)
            hideModal()
            toast.custom((t) => (
                <SuccessAlert t={t} title='دسته بندی با موفقیت ساخته شد .' />
            ), {
                position: 'top-left'
            })
        }
    }

    return (
        <>
            <div onClick={showModal} className='flex w-fit mb-5 items-center gap-2 bg-main cursor-pointer text-bgColer px-2 md:px-4 py-2 rounded-md transition-all duration-300 sm:hover:bg-secondary sm:hover:text-main'>
                <IoMdAddCircleOutline size={25} />
                <span className='text-nowrap block' >
                    افزودن دسته بندی
                </span>
            </div>

            <Modal coverClickhandler={hideModal} isModalShow={isModalShow}>
                <div className='p-5 border border-main border-opacity-50 rounded-lg bg-secondary'>
                    <h5 className='mb-3 font-semibold text-lg'>افزودن دسته بندی :</h5>
                    <div className='flex flex-col gap-2'>
                        <span>نام :</span>
                        <input value={name} onChange={e => {
                            setName(e.target.value)
                            setErrors(prev => ({ ...prev, name: false }))
                        }} className={`${errors.name ? '!border-red-600' : ''} bg-bgColer border border-transparent focus:border-main transition-all duration-300 outline-none rounded-md py-1 px-3`} type="text" />
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        <span>نام کوتاه :</span>
                        <input value={shortName} onChange={e => {
                            setShortName(e.target.value)
                            setErrors(prev => ({ ...prev, shortName: false }))
                        }} className={`${errors.shortName ? '!border-red-600' : ''} bg-bgColer border border-transparent focus:border-main transition-all duration-300 outline-none rounded-md py-1 px-3`} type="text" />
                    </div>
                    <div className='mt-3 flex justify-between items-center gap-1'>
                        <button onClick={hideModal} className='text-nowrap bg-main text-bgColer font-semibold w-full px-4 md:px-7 py-1 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main'>
                            لغو
                        </button>
                        <button onClick={createCategory} className='text-nowrap bg-main text-bgColer font-semibold w-full px-4 md:px-7 py-1 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main'>
                            افزودن
                        </button>
                    </div>
                </div>
            </Modal>

        </>

    )
}

export default Header