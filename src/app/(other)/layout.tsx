import Header from "@/components/layouts/Header/Header";

import BottomNav from "@/components/layouts/BottomNav/BottomNav";
import Footer from "@/components/layouts/Footer/Footer";
import FooterBottom from "@/components/layouts/Footer/FooterBottom";
import AdminPanelLink from "@/components/common/AdminPanelLink";



export default async function OtherLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="pb-[64px] lg:pb-0 pt-[75.52px]">
            <div className="container"><Header /></div>

            {children}
            <div className="container"><Footer /></div>
            <FooterBottom />
            <div className="container"><BottomNav /></div>


            <AdminPanelLink />
        </div>
    );
}