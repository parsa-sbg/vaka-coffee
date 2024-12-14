"use client"
import Link from "next/link";
import React, { useState } from "react";

type props = {
    productShortName: string
    intialDesc: string
}

function DescriptionBox({ productShortName, intialDesc }: props) {

    const [description, setDescription] = useState(intialDesc)

    return (
        <div>
            <div className="flex items-center gap-3">
                <Link href={`/p-admin/products/description/edit/${productShortName}`} className="block w-fit sm:hover:bg-secondary text-sm text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 mt-3 rounded-md transition-all duration-300 sm:hover:text-main">
                    ویرایش
                </Link>

                <button className="block w-fit sm:hover:bg-secondary text-sm text-nowrap bg-main text-bgColer font-semibold px-4 py-1.5 mt-3 rounded-md transition-all duration-300 sm:hover:text-main">
                    حذف
                </button>
            </div>

            <div dangerouslySetInnerHTML={{ __html: description }} className="p-5 mt-5 border border-secondary rounded-lg"></div>
        </div>
    )
}

export default DescriptionBox;
