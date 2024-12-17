import { ArticleInterface } from "@/models/Article";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LuImageOff } from "react-icons/lu";

type props = {
    article: ArticleInterface
}

function ArticleBox({ article }: props) {
    return (
        <Link href={`/articles/${article.shortName}`} className='bg-[#0f0f0f] rounded-md w-full flex flex-col gap-2 items-center'>

            <div className=' relative w-full h-[130px] sm:h-[150px] overflow-hidden rounded-md'>
                {article.image
                    ? <Image className='h-full w-full object-cover' src={article.image} alt='product image' quality={60} width={300} height={300} />
                    : <div className='w-full h-full bg-bgColer rounded-md flex items-center justify-center border border-main border-opacity-30'><LuImageOff size={60} className='text-main' /></div>
                }
            </div>

            <div className=" text-center p-3">
                <h4 className='text-sm sm:text-base font-semibold line-clamp-1'>{article.title}</h4>
                <p className="line-clamp-1 text-center break-words mt-2 text-wrap text-sm">{article.description}</p>
                <button className="mt-2 py-1.5 px-2 rounded-md bg-green-700 transition-colors duration-300 hover:bg-green-800 text-sm">بیشتر بخوانید</button>
            </div>

        </Link>
    )
}

export default ArticleBox;
