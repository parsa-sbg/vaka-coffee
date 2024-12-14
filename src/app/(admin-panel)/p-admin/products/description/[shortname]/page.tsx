import DescriptionBox from "@/components/modules/admin/products/DescriptionBox";
import { productmodel } from "@/models";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

type props = {
    params: Promise<{ shortname: string }>
}

async function page({ params }: props) {

    const productShortName = (await params).shortname

    const product = await productmodel.findOne({ shortName: productShortName })
    if (!product) {
        redirect('/')
    }


    const props = JSON.parse(JSON.stringify({
        productName: product.name,
        productId: product._id,
        intialDesc: product.description,
        productShortName: product.shortName,
    }))

    return (
        <div>
            <div className='flex justify-between'>
                <h1 className='font-bold text-xl relative pr-3 before:absolute before:w-2 before:h-2 before:rounded-full before:bg-white before:right-0 before:top-0 before:bottom-0 before:my-auto'>توضیحات محصول</h1>
                <Link href={'/p-admin/products'} className='flex items-center gap-2'>
                    <span>بازگشت</span>
                    <FaArrowLeft />
                </Link>
            </div>

            <div className="my-5">
                <span>نام محصول</span> : <span className="text-main">{product.name}</span>
            </div>

            <DescriptionBox {...props} />

        </div>
    )
}

export default page;
