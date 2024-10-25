import AllCategories from "@/components/modules/index/AllCategories";
import Header from "@/components/modules/index/Header";
import SeasionSection from "@/components/modules/index/SeasionSection";
import { Metadata } from "next";

export default function Home() {
  return (
    <div className="">
      <Header />
      <AllCategories />
      <SeasionSection />
    </div>
  );
}

export const metadata: Metadata = {
  title: "خرید قهوه | فروشگاه آنلاین قهوه واکا 🧙 ☕️",
  description: "خرید قهوه آنلاین از قهوه واکا یکی از بهترین قهوه فروشی‌های تهران با بهترین قیمت قهوه در کنار کیفیت و عطر و طعم عالی را تجربه کنید",
};
