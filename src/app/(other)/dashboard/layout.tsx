import DashboardHeader from "@/components/modules/dashboard/Header";
import DashboardMenu from "../../../components/modules/dashboard/index/DashboardMenu";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mt-16">
            <DashboardHeader />

            <div className="container grid gap-5 mt-16 sm:grid-cols-3 md:grid-cols-4">
                <DashboardMenu />
                <div className="sm:col-span-2 md:col-span-3">{children}</div>
                
            </div>

        </div>
    );
}