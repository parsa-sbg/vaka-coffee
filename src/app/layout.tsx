import "./globals.css";
import { Vazirmatn } from "next/font/google"

const vazirFont = Vazirmatn({
  variable: '--font-vazir',
  subsets: ["arabic",  "latin"]
});

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <html className="bg-bgColer" lang="fa" dir="rtl">

      <body className={`${vazirFont.variable} font-vazir text-white custom-scrollbar antialiased`}>

        {children}

      </body>

    </html>
  );


}
