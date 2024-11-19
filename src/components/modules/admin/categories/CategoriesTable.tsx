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
import { BiSolidImageAdd } from 'react-icons/bi'
import Image from 'next/image'
import { LuImageOff } from 'react-icons/lu'

type props = {
    intialCategories: CategoryInterface[]
}

function CategoriesTable({ intialCategories }: props) {

    const [categories, setCategories] = useState(intialCategories)
    const { showModal: showEditModal, hideModal: hideEditModal, isModalShow } = useModal()
    const [editModalvalues, setEditModalvalues] = useState<{ name: string, shortName: string, _id: null | mongoose.Types.ObjectId, iconUrl: string }>({ name: '', shortName: '', _id: null, iconUrl: '' })
    const [errors, setErrors] = useState({ name: false, shortName: false })
    const [isLoading, setIsLoading] = useState(false)

    const [icon, setIcon] = useState<File | undefined>(undefined)

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

        const formdata = new FormData()
        formdata.append('name', editModalvalues.name)
        formdata.append('shortName', editModalvalues.shortName)
        formdata.append('icon', icon ? icon : JSON.stringify(null))


        setIsLoading(true)
        const res = await fetch(`/api/categories/${editModalvalues._id}`, {
            method: "PUT",
            body: formdata
        })
        const data = await res.json()
        setIsLoading(false)


        if (res.status == 200) {
            setCategories(data.allCategories)
            hideEditModal()
            toast.custom((t) => (
                <SuccessAlert t={t} title='دسته بندی با موفقیت آپدیت شد .' />
            ), {
                position: 'top-left'
            })

        } else if (res.status == 409) {
            toast.custom((t) => (
                <ErrorAlert t={t} title={data.message} />
            ), {
                position: 'top-left'
            })
            setErrors(prev => ({ ...prev, shortName: true }))
        }else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }
    }

    const iconsChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            setErrors(prev => ({ ...prev, pictures: [] }))
            reader.onload = () => {
                setIcon(file)
                setEditModalvalues(prev => ({ ...prev, iconUrl: reader.result as string }))
                e.target.value = ''
            };

            reader.readAsDataURL(file);
        }
    }

    const editBtnClickhandler = (category: CategoryInterface) => {
        console.log(category);
        setEditModalvalues({ name: category.name, shortName: category.shortName, _id: category._id, iconUrl: category.iconUrl })
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
                        <th scope="col" className="px-3 py-3">
                            <span>آیکون</span>
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
                        <th scope="col" className="px-3 lg:px-6 py-3">
                            نمایش در صفحه اصلی
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {categories.map((category, index) => (
                        <CategoryItem setCategories={setCategories} editBtnClickhandler={editBtnClickhandler} key={category._id.toString()} category={category} isOdd={index % 2 == 0} number={index + 1} />
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

                    <div className='flex flex-col gap-2 mt-2'>
                        <span>آیکون :</span>

                        <div className='flex items-center justify-evenly'>

                            <div className="group col-span-1 border-2  w-24 h-24 !border-opacity-50 hover:!border-opacity-100 transition-colors border-dashed relative dark:border-gray-500 cursor-pointer rounded-lg ">
                                <input
                                    onChange={e => { iconsChangehandler(e) }}
                                    className="w-full h-full absolute bg-red-300 cursor-pointer z-20 opacity-0 hover:file:cursor-pointer"
                                    type="file"
                                    accept="image/png,image/jpeg"
                                />
                                <BiSolidImageAdd className="absolute top-0 bottom-0 right-0 left-0 m-auto opacity-50 transition-all group-hover:opacity-100" size={35} />
                            </div>

                            {editModalvalues.iconUrl
                                ? <div className='w-24 h-24  rounded-md overflow-hidden'>
                                    <Image className='object-cover w-full h-full' width={200} height={200} alt='' src={editModalvalues.iconUrl} ></Image>
                                </div>

                                : <div className='w-24 h-24 bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
                            }

                        </div>
                    </div>

                    <div className='mt-3 flex justify-between items-center gap-1'>
                        <button onClick={hideEditModal} className='text-nowrap bg-main text-bgColer font-semibold w-full px-4 md:px-7 py-1 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main'>
                            لغو
                        </button>
                        <button disabled={isLoading} onClick={updateCategory} className={`${isLoading ? '!bg-bgColer' : ''} min-h-7 text-nowrap bg-main text-bgColer font-semibold w-full px-4 md:px-7 py-1 text-sm rounded-md transition-all duration-300 sm:hover:bg-bgColer sm:hover:text-main`}>
                            {isLoading ? <div className='w-3 h-3 border-x-2 border-secondary rounded-full animate-spin mx-auto' /> : 'آپدیت'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CategoriesTable