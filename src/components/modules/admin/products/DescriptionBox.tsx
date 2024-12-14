"use client"
import mongoose from "mongoose";
import Link from "next/link";
import React, { useState } from "react";
import DeleteDescBtn from "./DeleteDescBtn";

type props = {
    productShortName: string
    intialDesc: string | null
    productId: mongoose.Types.ObjectId
    productName: string
}

function DescriptionBox({ productShortName, intialDesc, productId, productName }: props) {

    const [description, setDescription] = useState(intialDesc)

    return (
        <div>


            {description?.length
                ? (
                    <div>
                        <div className="flex items-center gap-3">
                            <Link href={`/p-admin/products/description/edit/${productShortName}`} className="block w-fit sm:hover:bg-secondary text-sm text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 mt-3 rounded-md transition-all duration-300 sm:hover:text-main">
                                ویرایش
                            </Link>

                            <DeleteDescBtn productId={productId} productName={productName} setDescription={setDescription} />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: description }} className="p-5 mt-5 border border-secondary rounded-lg"></div>
                    </div>
                )
                : (
                    <div>
                        <span className="block">این محصول توضیحاتی ندارد.</span>
                        <Link href={`/p-admin/products/description/edit/${productShortName}`} className="block w-fit sm:hover:bg-secondary text-sm text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 mt-3 rounded-md transition-all duration-300 sm:hover:text-main">
                            افزودن
                        </Link>
                    </div>
                )}

        </div>
    )
}

export default DescriptionBox;
