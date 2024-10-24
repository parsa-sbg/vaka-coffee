import Header from "@/components/modules/Header/Header";
import "./globals.css";
import { Vazirmatn } from "next/font/google"

const vazirFont = Vazirmatn({
  variable: '--font-vazir'
});


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html className="bg-bgColer" lang="fa" dir="rtl">
      <body className={`${vazirFont.variable} font-vazir text-white antialiased container`}>
        <Header />
        {children}
      </body>
    </html>
  );


}
