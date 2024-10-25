import Header from "@/components/layouts/Header/Header";

import BottomNav from "@/components/layouts/BottomNav/BottomNav";
import Footer from "@/components/layouts/Footer/Footer";
import FooterBottom from "@/components/layouts/Footer/FooterBottom";


export default function OtherLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="container"><Header /></div>

            {children}
            <div className="container"><Footer /></div>
            <FooterBottom />
            <div className="container"><BottomNav /></div>
        </div>
    );
}