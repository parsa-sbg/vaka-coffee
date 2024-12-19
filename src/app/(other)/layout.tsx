import Header from "@/components/layouts/Header/Header";

import BottomNav from "@/components/layouts/BottomNav/BottomNav";
import Footer from "@/components/layouts/Footer/Footer";
import FooterBottom from "@/components/layouts/Footer/FooterBottom";
import { CartItemInterface, CartModel } from "@/models/Cart";
import { cookies } from "next/headers";
import { authUserWithToken } from "@/utils/server/auth";
import { categoryModel, connectToDataBase } from "@/models";
import Link from "next/link";
import { MdOutlineAdminPanelSettings } from "react-icons/md";



export default async function OtherLayout({ children }: { children: React.ReactNode }) {
    let userIntialCart: CartItemInterface[] | null = null

    const token = (await cookies()).get('token')?.value
    const user = await authUserWithToken(token)
    if (user) {
        connectToDataBase()
        const targetCart = await CartModel.findOne({ user: user._id }).populate('user').populate('cart.product')
        if (targetCart) {
            userIntialCart = targetCart.cart
        } else {
            userIntialCart = []
        }
    }

    const categories = await categoryModel.find()


    return (
        <div className="pb-[64px] lg:pb-0 pt-[75.52px]">
            <div className="container"><Header categories={JSON.parse(JSON.stringify(categories))} userIntialCart={JSON.parse(JSON.stringify(userIntialCart))} /></div>

            {children}
            <div className="container"><Footer /></div>
            <FooterBottom />
            <div className="container"><BottomNav /></div>


            {user?.role !== 'USER' ? (
                <Link href={'/p-admin'} className="border border-secondary rounded-full transition-colors duration-300 hover:border-main bg-bgColer fixed p-3 bottom-20 lg:bottom-3 left-2 md:left-4 flex justify-center items-center z-30">
                    <MdOutlineAdminPanelSettings size={20} className="text-main" />
                </Link>
            ) : ''}
        </div>
    );
}