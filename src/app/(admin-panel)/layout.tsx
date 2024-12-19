import AdminMenu from "@/components/modules/admin/AdminMenu";
import AdminHeader from "@/components/modules/admin/Header";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { verifyToken } from "@/utils/server/token";
import { authUser } from "@/utils/server/auth";
import Link from "next/link";
import { GoArrowSwitch } from "react-icons/go";


export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {


    // route protection
    const token = (await cookies()).get('token')?.value
    if (!token) redirect('/dashboard', RedirectType.replace)
    const payload = verifyToken(token)
    if (!payload) redirect('/dashboard', RedirectType.replace)
    const user = await authUser(payload._id)
    if (!user) redirect('/dashboard', RedirectType.replace)
    if (user.role !== 'OWNER' && user.role !== 'ADMIN') redirect('/dashboard', RedirectType.replace)



    return (
        <div className="py-7">
            <AdminHeader />
            <div className="container overflow-hidden grid grid-cols-1 gap-5 mt-7 sm:grid-cols-3 md:grid-cols-4">
                <AdminMenu />
                <div className="col-span-1 overflow-x-scroll custom-scrollbar sm:col-span-2 md:col-span-3">{children}</div>
            </div>
            <Link href={'/'} className="border border-secondary rounded-full transition-colors duration-300 hover:border-main bg-bgColer fixed p-3 bottom-20 lg:bottom-3 left-2 md:left-4 flex justify-center items-center z-30">
                <GoArrowSwitch size={20} className="text-main" />
            </Link>
        </div>
    );
}