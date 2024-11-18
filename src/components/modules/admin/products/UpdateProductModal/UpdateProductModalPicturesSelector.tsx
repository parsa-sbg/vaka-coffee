import React, { useEffect, useState } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md';
import { errorsType } from './UpdateProductModal';
import { LuImageOff } from 'react-icons/lu';
import Image from 'next/image';


type props = {
    setPictures: React.Dispatch<React.SetStateAction<File[]>>
    errors: number[]
    pictures: File[]
    setErrors: React.Dispatch<React.SetStateAction<errorsType>>
    uploadNewPictures: boolean
    setUploadNewPictures: React.Dispatch<React.SetStateAction<boolean>>
    oldImages: string[]
}

function UpdateProductModalPicturesSelector({ setPictures, errors, setErrors, pictures, setUploadNewPictures, uploadNewPictures, oldImages }: props) {

    const [preview, setPreview] = useState<{ url: string, error: boolean }[]>([]);

    useEffect(() => {
        setPreview(prev =>
            prev.map((item) => ({ ...item, error: false }))
        )
        if (errors.length) {
            errors.map(i => {
                setPreview(prev =>
                    prev.map((item, index) => index == i ? { ...item, error: true } : item)
                )
            })
        }
    }, [errors])


    useEffect(() => {
        if (!pictures.length) {
            setPreview([])
        }
    }, [pictures])



    const changehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            setErrors(prev => ({ ...prev, pictures: [] }))
            reader.onload = () => {
                setPreview(prev => [...prev, { url: reader.result as string, error: false }]);
                setPictures(prev => [...prev, file])
                e.target.value = ''
            };

            reader.readAsDataURL(file);
        }
    }

    const deletehandler = (index: number) => {
        setPreview(prev => prev.filter((_, i) => i !== index))
        setPictures(prev => prev.filter((_, i) => i !== index))
        setErrors(prev => ({ ...prev, pictures: [] }))
    }

    return (
        <div className="">
            <div className='flex gap-5 items-center'>

                <h5 className='mb-1 font-semibold'>عکس های محصول</h5>

                <div className='flex items-center gap-2'>
                    <span>آپلود تصاویر جدید</span>
                    <label className=" items-center cursor-pointer">
                        <input onChange={e => { setUploadNewPictures(e.target.checked) }} value='' checked={uploadNewPictures} type="checkbox" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-main"></div>
                    </label>
                </div>

            </div>

            <div className={`${!uploadNewPictures ? 'hidden' : ''} grid grid-cols-3 w-full flex-wrap gap-3`}>

                <div className="group col-span-1 border-2 mx-auto w-24 h-24 !border-opacity-50 hover:!border-opacity-100 transition-colors border-dashed relative dark:border-gray-500 cursor-pointer rounded-lg ">
                    <input
                        onChange={e => { changehandler(e) }}
                        className="w-full h-full absolute bg-red-300 cursor-pointer z-20 opacity-0 hover:file:cursor-pointer"
                        type="file"
                        accept="image/png,image/jpeg"
                    />
                    <BiSolidImageAdd className="absolute top-0 bottom-0 right-0 left-0 m-auto opacity-50 transition-all group-hover:opacity-100" size={35} />
                </div>


                {preview.map((item, index) => (
                    <div key={item.url + index} className={`${item.error ? '!border-red-600' : ''} col-span-1 mx-auto w-24 h-24 border-2 !border-opacity-50 hover:!border-opacity-100 transition-colors overflow-hidden relative dark:border-gray-500 cursor-pointer rounded-lg `}>
                        <MdDelete
                            onClick={() => { deletehandler(index) }}
                            className="absolute top-1 left-1 bg-[#333] bg-opacity-80 p-0.5 rounded-sm hover:bg-red-700 transition-colors" size={25} />
                        {preview[index] ? <img className="h-full w-full object-cover" src={item.url} alt="" /> : 'Loading...'}
                    </div>
                ))}

            </div>

            <div className={`${!uploadNewPictures ? '' : 'hidden'} grid grid-cols-3 w-full flex-wrap gap-3`}>

                {oldImages.length
                    ? oldImages.map((item) => (
                        <div key={item} className={` col-span-1 mx-auto w-24 h-24 border-2 !border-opacity-50 hover:!border-opacity-100 transition-colors overflow-hidden relative dark:border-gray-500 cursor-pointer rounded-lg `}>
                            <Image width={200} height={200} className="h-full w-full object-cover" src={item} alt="" />
                        </div>
                    ))
                    : <div className='w-24 h-24 bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={30} className='text-main' /></div>
                }

            </div>

        </div>
    )
}

export default UpdateProductModalPicturesSelector