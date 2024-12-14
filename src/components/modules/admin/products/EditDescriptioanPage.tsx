"use client"

import ErrorAlert from "@/components/common/alerts/ErrorAlert";
import SuccessAlert from "@/components/common/alerts/SuccessAlert";
import ArticleEditor from "@/components/layouts/ArticleEditor/ArticleEditor";
import mongoose from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

type props = {
    productId: mongoose.Types.ObjectId,
    intialDescription: string
    productName: string
    productShortName: string

}

function DescriptioanPage({ intialDescription, productId, productName, productShortName }: props) {


    const [desc, setDesc] = useState(intialDescription)
    const [isLoading, setIsLoading] = useState(false)

    const route = useRouter()

    const updateDesc = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/products/description/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                newDescription: desc
            })
        })
        setIsLoading(false)


        if (res.status == 200) {
            const timeout = setTimeout(() => {
                route.replace(`/p-admin/products/description/${productShortName}`)
            }, 2000);

            toast.custom((t) => (
                <SuccessAlert t={t} title='توضیحات با موفقیت ثبت شد .' callBack={() => {
                    clearTimeout(timeout)
                    route.replace(`/p-admin/products/description/${productShortName}`)
                }} />
            ), {
                position: 'top-left',
                duration: 2000
            })
        } else {
            toast.custom((t) => (
                <ErrorAlert t={t} title='خطایی رخ داد !' />
            ), {
                position: 'top-left'
            })
        }


    }

    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='font-bold text-xl relative pr-3 before:absolute before:w-2 before:h-2 before:rounded-full before:bg-white before:right-0 before:top-0 before:bottom-0 before:my-auto'>ویرایش توضیحات محصول</h1>
                <Link href={`/p-admin/products/description/${productShortName}`} className='flex items-center gap-2'>
                    <span>بازگشت</span>
                    <FaArrowLeft />
                </Link>
            </div>

            <div className="my-5">
                <span>نام محصول</span> : <span className="text-main">{productName}</span>
            </div>

            <ArticleEditor content={desc} setContent={setDesc} />

            <div className="flex justify-center">
                <button onClick={updateDesc} className="py-1.5 px-10 h-8 w-52 mt-5 mx-auto bg-green-700 transition-colors duration-300 hover:bg-green-800 rounded-lg">
                    {isLoading
                        ? <div className='w-4 h-4 border-x-2 border-white rounded-full animate-spin mx-auto' />
                        : 'ثبت توضیحات'
                    }
                </button>
            </div>

        </div>
    )
}

export default DescriptioanPage;
