import ArticlesSlider from "@/components/common/ArticlesSlider";
import ProductsSlider from "@/components/common/ProductsSlider";
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

  const categoriesWithProducts = await categoryModel.find({ showInHomePage: true }).populate('products')
  const allCategories = await categoryModel.find().sort({ createdAt: -1 })

  const discountedProducts = await productmodel.find({ discount: { $gt: 0 } }).limit(10)

  const articles = await ArticleModel.find({})

  return (
    <div className="">
      <div className="container">
        <Header />
        <AllCategories allCats={allCategories} />


        <SeasionSection discountedProducts={discountedProducts} />

        {categoriesWithProducts.map(cat => (
          <CategorySection key={cat._id.toString()} categoryWithProducts={cat} />
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

export const revalidate = 60

export const metadata: Metadata = {
  title: "خرید قهوه | فروشگاه آنلاین قهوه واکا 🧙 ☕️",
  description: "خرید قهوه آنلاین از قهوه واکا یکی از بهترین قهوه فروشی‌های تهران با بهترین قیمت قهوه در کنار کیفیت و عطر و طعم عالی را تجربه کنید",
};
