import Header from "@/components/layouts/Header/Header";

import BottomNav from "@/components/layouts/BottomNav/BottomNav";
import Footer from "@/components/layouts/Footer/Footer";
import FooterBottom from "@/components/layouts/Footer/FooterBottom";
import { CartContextProvider } from "@/contexts/cartContext";


export default function OtherLayout({ children }: { children: React.ReactNode }) {
    return (
        <CartContextProvider>
            <div className="pb-[64px] lg:pb-0 pt-[75.52px]">
                <div className="container"><Header /></div>

                {children}
                <div className="container"><Footer /></div>
                <FooterBottom />
                <div className="container"><BottomNav /></div>
            </div>
        </CartContextProvider>
    );
}