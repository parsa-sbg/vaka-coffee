"use client"
import { CategoryInterface } from '@/models/Category'
import React, { useState } from 'react'
import CategoryItem from './CategoryItem'
import Header from './Header'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/useModal'
import { categorySchema } from '@/validation/category'
import toast from 'react-hot-toast'
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import mongoose from 'mongoose'

type props = {
    intialCategories: CategoryInterface[]
}

function CategoriesTable({ intialCategories }: props) {

    const [categories, setCategories] = useState(intialCategories)
    const { showModal: showEditModal, hideModal: hideEditModal, isModalShow } = useModal()
    const [editModalvalues, setEditModalvalues] = useState<{ name: string, shortName: string, _id: null | mongoose.Types.ObjectId }>({ name: '', shortName: '', _id: null })
    const [errors, setErrors] = useState({ name: false, shortName: false })


    const updateCategory = async () => {

        const parsedData = categorySchema.safeParse({ name: editModalvalues.name, shortName: editModalvalues.shortName })
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


        const res = await fetch(`/api/categories/${editModalvalues._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: editModalvalues.name,
                shortName: editModalvalues.shortName
            })
        })

        if (res.status == 200) {
            const data = await res.json()
            setCategories(data.allCategories)
            hideEditModal()
            toast.custom((t) => (
                <SuccessAlert t={t} title='دسته بندی با موفقیت آپدیت شد .' />
            ), {
                position: 'top-left'
            })
        } else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }
    }

    const editBtnClickhandler = (category: CategoryInterface) => {
        setEditModalvalues({ name: category.name, shortName: category.shortName, _id: category._id })
        showEditModal()
    }

    return (
        <>
            <Header setCategories={setCategories} />
            <table className="rounded-md overflow-hidden text-sm text-left rtl:text-right">

                <thead className="text-xs text-nowrap bg-secondary">
                    <tr>
                        <th scope="col" className="px-1 py-3">
                            <span>شماره</span>
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            نام
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            نام کوتاه
                        </th>
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            عملیات
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {categories.map((category, index) => (
                        <CategoryItem editBtnClickhandler={editBtnClickhandler} key={category._id.toString()} category={category} isOdd={index % 2 == 0} number={index + 1} />
                    ))}

                </tbody>
            </table>

            <Modal coverClickhandler={hideEditModal} isModalShow={isModalShow}>
                <div className='p-5 border border-main border-opacity-50 rounded-lg bg-secondary'>
                    <h5 className='mb-3 font-semibold text-lg'>آپدیت دسته بندی :</h5>
                    <div className='flex flex-col gap-2'>
                        <span>نام :</span>
                        <input value={editModalvalues.name} onChange={e => {
                            setEditModalvalues(prev => ({ ...prev, name: e.target.value }))
                            setErrors(prev => ({ ...prev, name: false }))
                        }} className={`${errors.name ? '!border-red-600' : ''} bg-bgColer border border-transparent focus:border-main transition-all duration-300 outline-none rounded-md py-1 px-3`} type="text" />
                    </div>
                    <div className='flex flex-col gap-2 mt-2'>
                        <span>نام کوتاه :</span>
                        <input value={editModalvalues.shortName} onChange={e => {
                            setEditModalvalues(prev => ({ ...prev, shortName: e.target.value }))
                            setErrors(prev => ({ ...prev, shortName: false }))
                        }} className={`${errors.shortName ? '!border-red-600' : ''} bg-bgColer border border-transparent focus:border-main transition-all duration-300 outline-none rounded-md py-1 px-3`} type="text" />
                    </div>
                    <div className='mt-3 flex justify-between items-center gap-1'>
                        <button onClick={hideEditModal} className='text-nowrap bg-main text-bgColer font-semibold w-full px-4 md:px-7 py-1 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main'>
                            لغو
                        </button>
                        <button onClick={updateCategory} className='text-nowrap bg-main text-bgColer font-semibold w-full px-4 md:px-7 py-1 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main'>
                            آپدیت
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CategoriesTable