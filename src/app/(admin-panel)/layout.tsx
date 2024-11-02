import AdminMenu from "@/components/modules/admin/AdminMenu";
import AdminHeader from "@/components/modules/admin/Header";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="py-7">
            <AdminHeader />
            <div className="container grid grid-cols-1 gap-5 mt-7 sm:grid-cols-3 md:grid-cols-4">
                <AdminMenu />
                <div className="col-span-1 sm:col-span-2 md:col-span-3">{children}</div>
            </div>

        </div>
    );
}