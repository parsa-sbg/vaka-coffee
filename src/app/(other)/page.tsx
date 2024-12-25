import AllCategories from "@/components/modules/index/AllCategories";
import ArticlesSection from "@/components/modules/index/ArticlesSection";
import Baner from "@/components/modules/index/Baner";
import CategorySection from "@/components/modules/index/CategorySection";
import FrequentlyQuestions from "@/components/modules/index/FrequentlyQuestions/FrequentlyQuestions";
import Header from "@/components/modules/index/Header";
import SeasionSection from "@/components/modules/index/SeasionSection";
import { categoryModel, productmodel } from "@/models";
import { ArticleModel } from "@/models/Article";
import { connectToDataBase } from "@/utils/server/dataBase";
import { Metadata } from "next";

export default async function Home() {

  await connectToDataBase()

  const allCategories = await categoryModel.find().sort({ updatedAt: -1 })
  const categoriesForCategoriesSection = await categoryModel.find({ showInHomePage: true }).sort({ updatedAt: -1 })

  const discountedProducts = await productmodel.find({ discount: { $gt: 0 }, stock: { $gt: 0 } }).limit(10)

  const articles = await ArticleModel.find({})

  return (
    <div className="">
      <div className="container">
        <Header />
        <AllCategories allCats={allCategories} />


        {discountedProducts.length > 2 ? <SeasionSection discountedProducts={discountedProducts} /> : ''}

        {categoriesForCategoriesSection.map(cat => (
          <CategorySection key={cat._id.toString()} category={cat} />
        ))}

        {articles.length > 3 ? <ArticlesSection articles={JSON.parse(JSON.stringify(articles))} /> : ''}

      </div>

      <Baner />

      <div className="container">
        <FrequentlyQuestions />
      </div>

    </div>
  );
}

export const revalidate = 120
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "خرید قهوه | فروشگاه آنلاین قهوه واکا 🧙 ☕️",
  description: "خرید قهوه آنلاین از قهوه واکا یکی از بهترین قهوه فروشی‌های تهران با بهترین قیمت قهوه در کنار کیفیت و عطر و طعم عالی را تجربه کنید",
};
