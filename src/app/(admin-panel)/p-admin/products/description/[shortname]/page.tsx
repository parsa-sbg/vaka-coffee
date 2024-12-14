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

            {product.description
                ? (
                    <DescriptionBox intialDesc={product.description} productShortName={product.shortName} />
                )
                : (
                    <div>
                        <span className="block">این محصول توضیحاتی ندارد.</span>
                        <Link href={`/p-admin/products/description/edit/${product.shortName}`} className="block w-fit sm:hover:bg-secondary text-sm text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 mt-3 rounded-md transition-all duration-300 sm:hover:text-main">
                            افزودن
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default page;
