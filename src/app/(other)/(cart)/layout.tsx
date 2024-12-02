import Header from "@/components/modules/cart/Header";

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            
            <Header />

            <div className="container">
                {children}
            </div>

        </div>

    );
}