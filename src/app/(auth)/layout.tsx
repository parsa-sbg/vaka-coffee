import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center sm:py-20 sm:px-5 md:px-20 lg:px-32 bg-secondary xl:px-72  h-screen ">
            <div className="w-full h-full sm:rounded-3xl overflow-hidden flex justify-between">

                <div className="!w-full sm:min-w-[350px] z-20 p-3 lg:w-auto bg-bgColer lg:p-5">
                    {children}
                </div>

                <div className="min-w-96 hidden h-full z-10 sm:flex justify-center">
                    <Image priority className="w-full h-full object-cover" src='/loginimage.jpg' width={500} height={900} alt="coffee image"></Image>
                </div>
            </div>
            <Link href='/' replace className="flex items-center gap-2 z-30 text-nowrap fixed top-5 left-5">
                صفحه اصلی
                <FaArrowLeft />
            </Link>
        </div>
    );
}