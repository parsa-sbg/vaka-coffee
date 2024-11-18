"use client"
import ErrorAlert from '@/components/common/alerts/ErrorAlert'
import SuccessAlert from '@/components/common/alerts/SuccessAlert'
import Modal from '@/components/common/Modal'
import { useModal } from '@/hooks/useModal'
import { CategoryInterface } from '@/models/Category'
import { CategoryImageFileSchema, categorySchema } from '@/validation/category'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiSolidImageAdd } from 'react-icons/bi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { LuImageOff } from 'react-icons/lu'

function Header({ setCategories }: { setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>> }) {

    const { showModal, hideModal, isModalShow } = useModal()
    const [name, setName] = useState('')
    const [shortName, setShortName] = useState('')
    const [errors, setErrors] = useState({ name: false, shortName: false })

    const [icon, setIcon] = useState<File | undefined>(undefined)
    const [iconPreview, setIconPreview] = useState<string>('')



    const iconsChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            setErrors(prev => ({ ...prev, pictures: [] }))
            reader.onload = () => {
                setIcon(file)
                setIconPreview(reader.result as string);
                e.target.value = ''
            };

            reader.readAsDataURL(file);
        }
    }

    const createCategory = async () => {
        const iconParseddata = CategoryImageFileSchema.safeParse({ icon })

        if (!iconParseddata.success) {
            iconParseddata.error.issues.map(issue => {
                toast.custom((t) => (
                    <ErrorAlert t={t} title={issue.message} />
                ), {
                    position: 'top-left'
                })
                setErrors(prev => ({ ...prev, [issue.path[0]]: true }))
            })
        }
        
        const parsedData = categorySchema.safeParse({ name, shortName, icon })
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

        const formData = new FormData()
        formData.append('name', name)
        formData.append('shortName', shortName)
        formData.append('icon', icon as File)


        const res = await fetch('/api/categories', {
            method: "POST",
            body: formData
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

                            {icon
                                ? <div className='w-24 h-24  rounded-md overflow-hidden'>
                                    <Image className='object-cover w-full h-full' width={200} height={200} alt='' src={iconPreview} ></Image>
                                </div>

                                : <div className='w-24 h-24 bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
                            }

                        </div>
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