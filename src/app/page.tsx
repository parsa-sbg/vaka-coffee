import AllCategories from "@/components/modules/index/AllCategories";
import Baner from "@/components/modules/index/Baner";
import CategorySection from "@/components/modules/index/CategorySection";
import Header from "@/components/modules/index/Header";
import SeasionSection from "@/components/modules/index/SeasionSection";
import { Metadata } from "next";

export default function Home() {
  return (
    <div className="pb-96">
      <div className="container">
        <Header />
        <AllCategories />
        <SeasionSection />
        <CategorySection buttonText="همه قهوه ترک‌ها" title="قهوه ترک" />
        <CategorySection buttonText="همه قهوه فوری‌ها" title="خرید قهوه فوری" />
        <CategorySection buttonText="همه تجهیزات قهوه" title="تجهیزات قهوه" />
      </div>

      <Baner />
    </div>
  );
}

export const metadata: Metadata = {
  title: "خرید قهوه | فروشگاه آنلاین قهوه واکا 🧙 ☕️",
  description: "خرید قهوه آنلاین از قهوه واکا یکی از بهترین قهوه فروشی‌های تهران با بهترین قیمت قهوه در کنار کیفیت و عطر و طعم عالی را تجربه کنید",
};
