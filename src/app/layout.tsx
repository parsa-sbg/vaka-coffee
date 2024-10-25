import Header from "@/components/layouts/Header/Header";
import "./globals.css";
import { Vazirmatn } from "next/font/google"
import BottomNav from "@/components/layouts/BottomNav/BottomNav";

const vazirFont = Vazirmatn({
  variable: '--font-vazir'
});


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html className="bg-bgColer" lang="fa" dir="rtl">
      
      <body className={`${vazirFont.variable} font-vazir text-white pb-[64px] lg:pb-0 pt-[75.52px] custom-scrollbar antialiased`}>

        <div className="container"><Header /></div>

        {children}

        <div className="container"><BottomNav /></div>

      </body>

    </html>
  );


}
