import "./globals.css";
import { Vazirmatn } from "next/font/google"

const vazirFont = Vazirmatn({
  variable: '--font-vazir'
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html className="bg-bgColer" lang="fa" dir="rtl">

      <body className={`${vazirFont.variable} font-vazir text-white pb-[64px] lg:pb-0 pt-[75.52px] custom-scrollbar antialiased`}>

        {children}

      </body>

    </html>
  );


}
