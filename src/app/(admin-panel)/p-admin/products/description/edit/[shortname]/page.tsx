import EditDescriptioanPage from "@/components/modules/admin/products/EditDescriptioanPage";
import { productmodel } from "@/models";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

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
        intialDescription: product.description as string,
        productName: product.name,
        productId: product._id,
        productShortName: product.shortName
    }))

    return (
        <div>
            <EditDescriptioanPage {...props} />
        </div>
    )
}
export default page

export const metadata: Metadata = {
    title: 'پنل مدیریت | ویرایش محصول'
}
