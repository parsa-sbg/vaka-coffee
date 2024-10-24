import Header from "@/components/modules/index/Header";
import { Metadata } from "next";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <Header />
    </div>
  );
}

export const metadata: Metadata = {
  title: "خرید قهوه | فروشگاه آنلاین قهوه واکا 🧙 ☕️",
  description: "خرید قهوه آنلاین از قهوه واکا یکی از بهترین قهوه فروشی‌های تهران با بهترین قیمت قهوه در کنار کیفیت و عطر و طعم عالی را تجربه کنید",
};
