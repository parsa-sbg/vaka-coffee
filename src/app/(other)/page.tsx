import AllCategories from "@/components/modules/index/AllCategories";
import Baner from "@/components/modules/index/Baner";
import CategorySection from "@/components/modules/index/CategorySection";
import FrequentlyQuestions from "@/components/modules/index/FrequentlyQuestions/FrequentlyQuestions";
import Header from "@/components/modules/index/Header";
import SeasionSection from "@/components/modules/index/SeasionSection";
import { categoryModel, productmodel } from "@/models";
import { connectToDataBase } from "@/utils/server/dataBase";
import { Metadata } from "next";

export default async function Home() {

  connectToDataBase()

  const categoriesWithProducts = await categoryModel.find({ showInHomePage: true }).populate('products')

  const discountedProducts = await productmodel.find({ discount: { $gt: 0 } })


  return (
    <div className="">
      <div className="container">
        <Header />
        <AllCategories allCats={categoriesWithProducts} />


        <SeasionSection discountedProducts={discountedProducts} />

        {categoriesWithProducts.map(cat => (
          <CategorySection key={cat._id.toString()} categoryWithProducts={cat} />
        ))}

      </div>

      <Baner />

      <div className="container">
        <FrequentlyQuestions />
      </div>

    </div>
  );
}

export const revalidate = 60

export const metadata: Metadata = {
  title: "خرید قهوه | فروشگاه آنلاین قهوه واکا 🧙 ☕️",
  description: "خرید قهوه آنلاین از قهوه واکا یکی از بهترین قهوه فروشی‌های تهران با بهترین قیمت قهوه در کنار کیفیت و عطر و طعم عالی را تجربه کنید",
};
