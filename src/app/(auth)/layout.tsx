import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center sm:py-20 sm:px-5 md:px-20 lg:px-32 bg-secondary xl:px-72 justify-center h-screen ">
            <div className="w-full h-full sm:rounded-3xl overflow-hidden flex justify-between">

                <div className="!w-full min-w-80 z-20 sm:w-auto bg-bgColer p-10 sm:p-7">
                    {children}
                </div>

                <div className="min-w-96 hidden h-full z-10 sm:flex justify-center">
                    <Image className="w-full h-full object-cover" src='/loginimage.jpg' width={500} height={1000} alt="coffee image"></Image>
                </div>
            </div>
        </div>
    );
}